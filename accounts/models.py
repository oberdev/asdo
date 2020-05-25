from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.db import models

REQUIRED = {
    'required': True
}


class User(AbstractUser):
    first_name = models.CharField(_('first name'), max_length=30)
    last_name = models.CharField(_('last name'), max_length=150)
    middle_name = models.CharField(_('Отчество'), max_length=150)
    email = models.EmailField(_('email address'))
    is_student = models.BooleanField(default=False)
    is_tutor = models.BooleanField(default=False)


User._meta.get_field('username').verbose_name = _('Логин')


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class TutorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    description = models.CharField(max_length=255, verbose_name='Описание', blank=True)
