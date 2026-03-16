from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Attendance, Employee
from .serializers import AttendanceSerializer, EmployeeSerializer


class HealthView(APIView):
    def get(self, request):
        return Response({"status": "ok"})


class EmployeeListCreateView(APIView):
    def get(self, request):
        employees = Employee.objects.order_by("full_name")
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            try:
                employee = serializer.save()
            except Exception as exc:
                message = str(exc)
                if "unique" in message.lower() and "employee_id" in message.lower():
                    return Response({"message": "Employee ID already exists."}, status=status.HTTP_400_BAD_REQUEST)
                if "unique" in message.lower() and "email" in message.lower():
                    return Response({"message": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)
                raise
            return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)

        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDetailView(APIView):
    def get(self, request, employee_id):
        employee = Employee.objects.filter(employee_id=employee_id).first()
        if not employee:
            return Response({"message": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(EmployeeSerializer(employee).data)

    def delete(self, request, employee_id):
        employee = Employee.objects.filter(employee_id=employee_id).first()
        if not employee:
            return Response({"message": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AttendanceListCreateView(APIView):
    def get(self, request):
        employee_id = request.query_params.get("employee_id")
        attendance_qs = Attendance.objects.all()
        if employee_id:
            attendance_qs = attendance_qs.filter(employee__employee_id=employee_id)
        serializer = AttendanceSerializer(attendance_qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            try:
                attendance = serializer.save()
            except Exception as exc:
                message = str(exc)
                if "unique" in message.lower():
                    return Response(
                        {"message": "Attendance already exists for this employee and date."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                raise
            return Response(AttendanceSerializer(attendance).data, status=status.HTTP_201_CREATED)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
