from django.urls import path, include
from .views import SignUpStudentView, SignUpTutorView

urlpatterns = [
    # insert extra routes
    path('signup/student', SignUpStudentView.as_view(), name='signup_student'),
    path('signup/tutor', SignUpTutorView.as_view(), name='signup_tutor'),
    path('', include('django.contrib.auth.urls'))
]