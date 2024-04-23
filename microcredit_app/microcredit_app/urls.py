from django.contrib import admin
from django.urls import path
from myapp import views
from django.contrib.auth import views as auth_views



urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login_view, name='login'),  
    path('obtener_microcreditos/', views.obtener_microcreditos, name='obtener_microcreditos'),
    path('crear_microcredito/', views.crear_microcredito, name='crear_microcredito'),
    path('api/register/', views.register_user, name='register_user'),






]
