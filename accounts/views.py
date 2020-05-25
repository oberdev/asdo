from django.urls import reverse_lazy
from django.views.generic import CreateView
from .forms import SignUpStudentForm, SignUpTutorForm


class SignUpTutorView(CreateView):
    form_class = SignUpTutorForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["role"] = "tutor"
        return context


class SignUpStudentView(CreateView):
    form_class = SignUpStudentForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["role"] = "student"
        return context
