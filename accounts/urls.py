from django.urls import path, include
from .views import SignUpView

urlpatterns = [
    # insert extra routes
    path('signup', SignUpView.as_view(), name='signup'),
    path('', include('django.contrib.auth.urls'))
]