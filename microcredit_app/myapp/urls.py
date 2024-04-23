from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('crear_microcredito/', views.crear_microcredito, name='crear_microcredito'),

]