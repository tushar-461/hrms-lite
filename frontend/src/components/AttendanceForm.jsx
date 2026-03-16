import React from "react";
import { attendanceStatuses } from "../data/constants";

export default function AttendanceForm({ employees, onSubmit, isSubmitting }) {
  const [form, setForm] = React.useState({
    employeeId: "",
    date: new Date().toISOString().slice(0, 10),
    status: attendanceStatuses[0]
  });

  React.useEffect(() => {
    if (employees.length > 0 && !form.employeeId) {
      setForm((prev) => ({ ...prev, employeeId: employees[0].employeeId }));
    }
  }, [employees, form.employeeId]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <section className="panel">
      <h2>Mark Attendance</h2>

      {employees.length === 0 ? (
        <p className="empty">Add an employee before marking attendance.</p>
      ) : (
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Employee
            <select
              value={form.employeeId}
              onChange={(e) => updateField("employeeId", e.target.value)}
              required
            >
              {employees.map((employee) => (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.fullName} ({employee.employeeId})
                </option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              required
            />
          </label>

          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
            >
              {attendanceStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Attendance"}
          </button>
        </form>
      )}
    </section>
  );
}
