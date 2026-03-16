from django.urls import path
from .views import AttendanceListCreateView, EmployeeDetailView, EmployeeListCreateView, HealthView

urlpatterns = [
    path("", HealthView.as_view(), name="health"),
    path("employees/", EmployeeListCreateView.as_view(), name="employee-list"),
    path("employees/<str:employee_id>/", EmployeeDetailView.as_view(), name="employee-detail"),
    path("attendance/", AttendanceListCreateView.as_view(), name="attendance"),
]
