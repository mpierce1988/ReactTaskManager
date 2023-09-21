"""
URL configuration for taskmanager project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backendapi import views

urlpatterns = [
    path('/api', views.hello, name='hello'),
    path('api/user/register', views.register, name='register'),
    path('api/user/login', views.login, name='login'),
    path('api/tasks/<int:user_id>', views.tasks_view, name='tasks_view'),
    path('api/tasks/<int:user_id>/<int:task_id>', views.task_view, name='task_view')

]
