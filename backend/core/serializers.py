from rest_framework import serializers
from .models import Attendance, Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["id", "employee_id", "full_name", "email", "department", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_employee_id(self, value):
        if not value.strip():
            raise serializers.ValidationError("Employee ID is required.")
        return value

    def validate_full_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Full name is required.")
        return value

    def validate_email(self, value):
        if not value.strip():
            raise serializers.ValidationError("Email is required.")
        return value.lower()


class AttendanceSerializer(serializers.ModelSerializer):
    employee_id = serializers.CharField(write_only=True)
    employee = EmployeeSerializer(read_only=True)

    class Meta:
        model = Attendance
        fields = ["id", "employee", "employee_id", "date", "status", "created_at"]
        read_only_fields = ["id", "created_at", "employee"]

    def validate_employee_id(self, value):
        if not value.strip():
            raise serializers.ValidationError("Employee ID is required.")
        return value

    def validate_status(self, value):
        if value not in {Attendance.STATUS_PRESENT, Attendance.STATUS_ABSENT}:
            raise serializers.ValidationError("Status must be Present or Absent.")
        return value

    def create(self, validated_data):
        employee_id = validated_data.pop("employee_id")
        try:
            employee = Employee.objects.get(employee_id=employee_id)
        except Employee.DoesNotExist:
            raise serializers.ValidationError({"employee_id": "Employee not found."})
        return Attendance.objects.create(employee=employee, **validated_data)
