from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from .models import Microcredito, UserProfile
from .forms.forms import MicrocreditoForm
from django.contrib.auth.models import User



@csrf_exempt
def login_view(request):
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)

        user_profile = UserProfile.objects.get(user_id=user.id)
        employee = user_profile.employee
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'employee': employee})

        else:
            # Devolver datos JSON con error
            return JsonResponse({'success': False, 'error': 'Credenciales inválidas'})

    return JsonResponse({'success': False, 'error': 'Método no permitido'})

def obtener_microcreditos(request):
    
    microcreditos = Microcredito.objects.all().values()
    return JsonResponse(list(microcreditos), safe=False)


def crear_microcredito(request):
    

    if request.method == 'GET':
        trade = request.GET.get('trade')
        amount = request.GET.get('amount')
        status = request.GET.get('status')

        user_id = 3

        form = MicrocreditoForm({'trade': trade, 'amount': amount, 'status': status, 'user': user_id})
        if form.is_valid():
            microcredito = form.save()
            return JsonResponse({'message': 'Microcrédito creado exitosamente.', 'microcredito_id': microcredito.id})
        else:
            errors = form.errors.as_json()
            return JsonResponse({'error': 'Error al crear el microcrédito. Por favor, revise los datos.', 'errors': errors}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido.'}, status=405)

def register_user(request):
    import pdb; pdb.set_trace()
    if request.method == 'GET':
        username = request.GET.get('username')
        password = request.GET.get('password')
        is_employee = request.GET.get('is_employee', False)  
        if is_employee == 'true':
            is_employee = True
        else:
            is_employee = False

        try:
            user = User.objects.create_user(username=username, password=password)
            user_profile = UserProfile.objects.create(user=user, employee=is_employee)
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        return JsonResponse({'success': False, 'error': 'Método no permitido'})



