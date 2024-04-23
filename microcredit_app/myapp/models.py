from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    employee = models.BooleanField(default=False) 

    def __str__(self):
        return self.user.username


class Microcredito(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    trade = models.CharField(max_length=100, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    init_date = models.DateTimeField(auto_now_add=True, null=True)
    status = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('aprobado', 'Aprobado'), ('rechazado', 'Rechazado')], default='pendiente')
    description = models.TextField(blank=True, null=True)
