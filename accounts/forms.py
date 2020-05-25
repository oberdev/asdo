from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction
from .models import User, TutorProfile, StudentProfile

EXTRA_USER_FIELDS = ('last_name', 'first_name', 'middle_name', 'email')
EXTRA_TUTOR_FIELDS = ()
EXTRA_STUDENT_FIELDS = ()


class SignUpStudentForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = EXTRA_USER_FIELDS + UserCreationForm.Meta.fields + EXTRA_STUDENT_FIELDS

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_student = True
        user.save()
        student = StudentProfile.objects.create(user=user)
        return user


class SignUpTutorForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = EXTRA_USER_FIELDS + UserCreationForm.Meta.fields + EXTRA_TUTOR_FIELDS


    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.is_tutor = True
        user.save()
        tutor = TutorProfile.objects.create(user=user)
        return user
