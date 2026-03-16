import React from "react";
import AppShell from "./components/AppShell";
import Banner from "./components/Banner";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceList from "./components/AttendanceList";
import {
  fetchEmployees,
  fetchAttendance,
  createEmployee,
  deleteEmployeeApi,
  createAttendance
} from "./api/client";

const tabs = [
  { id: "employees", label: "Employee Management" },
  { id: "attendance", label: "Attendance Management" }
];

export default function App() {
  const [activeTab, setActiveTab] = React.useState("employees");
  const [employees, setEmployees] = React.useState([]);
  const [attendance, setAttendance] = React.useState([]);
  const [isBootLoading, setIsBootLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [banner, setBanner] = React.useState({ message: "", tone: "info" });
  const [hasBootError, setHasBootError] = React.useState(false);

  React.useEffect(() => {
    async function boot() {
      try {
        const [employeesData, attendanceData] = await Promise.all([
          fetchEmployees(),
          fetchAttendance()
        ]);
        setEmployees(employeesData);
        setAttendance(attendanceData);
      } catch (error) {
        setHasBootError(true);
        notify(error.message || "Failed to load data from server.", "error");
      } finally {
        setIsBootLoading(false);
      }
    }

    boot();
  }, []);

  function notify(message, tone = "info") {
    setBanner({ message, tone });
  }

  async function handleAddEmployee(form) {
    const trimmedId = form.employeeId.trim();
    const trimmedName = form.fullName.trim();
    const trimmedEmail = form.email.trim().toLowerCase();

    if (!trimmedId || !trimmedName || !trimmedEmail) {
      notify("Please fill all required employee fields.", "error");
      return;
    }

    const duplicateId = employees.some((item) => item.employeeId.toLowerCase() === trimmedId.toLowerCase());
    if (duplicateId) {
      notify(`Employee ID ${trimmedId} already exists.`, "error");
      return;
    }

    const duplicateEmail = employees.some((item) => item.email.toLowerCase() === trimmedEmail);
    if (duplicateEmail) {
      notify(`Email ${trimmedEmail} is already used.`, "error");
      return;
    }

    setIsSaving(true);
    try {
      const created = await createEmployee({
        employeeId: trimmedId,
        fullName: trimmedName,
        email: trimmedEmail,
        department: form.department
      });
      setEmployees((prev) => [...prev, created]);
      notify("Employee added successfully.", "success");
    } catch (error) {
      notify(error.message || "Failed to add employee.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteEmployee(employeeId) {
    setIsSaving(true);
    try {
      await deleteEmployeeApi(employeeId);
      const remainingEmployees = employees.filter((item) => item.employeeId !== employeeId);
      const remainingAttendance = attendance.filter((item) => item.employeeId !== employeeId);
      setEmployees(remainingEmployees);
      setAttendance(remainingAttendance);
      notify("Employee and related attendance deleted.", "success");
    } catch (error) {
      notify(error.message || "Failed to delete employee.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleMarkAttendance(form) {
    if (!form.employeeId || !form.date || !form.status) {
      notify("Please fill all attendance fields.", "error");
      return;
    }

    const exists = attendance.some(
      (entry) => entry.employeeId === form.employeeId && entry.date === form.date
    );

    if (exists) {
      notify("Attendance for this employee on this date already exists.", "error");
      return;
    }

    setIsSaving(true);

    try {
      const created = await createAttendance({
        employeeId: form.employeeId,
        date: form.date,
        status: form.status
      });
      setAttendance((prev) => [...prev, created]);
      notify("Attendance marked successfully.", "success");
    } catch (error) {
      notify(error.message || "Failed to mark attendance.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AppShell
      title="HRMS Lite"
      subtitle="Manage employees and track attendance from one clean dashboard."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <Banner
        message={banner.message}
        tone={banner.tone}
        onClose={() => setBanner({ message: "", tone: "info" })}
      />

      {isBootLoading ? (
        <section className="panel loading">Loading HRMS workspace...</section>
      ) : hasBootError ? (
        <section className="panel error">
          <p>Could not load data from the server. Please check that the backend is running.</p>
        </section>
      ) : activeTab === "employees" ? (
        <div className="grid two-up">
          <EmployeeForm onSubmit={handleAddEmployee} isSubmitting={isSaving} />
          <EmployeeList employees={employees} onDelete={handleDeleteEmployee} />
        </div>
      ) : (
        <div className="grid two-up">
          <AttendanceForm
            employees={employees}
            onSubmit={handleMarkAttendance}
            isSubmitting={isSaving}
          />
          <AttendanceList employees={employees} attendance={attendance} />
        </div>
      )}
    </AppShell>
  );
}
