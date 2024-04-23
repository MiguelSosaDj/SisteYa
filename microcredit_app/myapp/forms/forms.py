from django import forms
from  myapp.models import Microcredito

class MicrocreditoForm(forms.ModelForm):
    class Meta:
        model = Microcredito
        fields = ['trade', 'amount', 'status', 'user']
