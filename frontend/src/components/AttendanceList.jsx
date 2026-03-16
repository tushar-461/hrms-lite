import React from "react";

export default function AttendanceList({ employees, attendance }) {
  const [employeeFilter, setEmployeeFilter] = React.useState("all");

  const employeeLookup = React.useMemo(() => {
    return employees.reduce((acc, employee) => {
      acc[employee.employeeId] = employee;
      return acc;
    }, {});
  }, [employees]);

  const filtered = React.useMemo(() => {
    const result =
      employeeFilter === "all"
        ? attendance
        : attendance.filter((item) => item.employeeId === employeeFilter);

    return [...result].sort((a, b) => b.date.localeCompare(a.date));
  }, [attendance, employeeFilter]);

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Attendance Records</h2>
        <label className="compact-field">
          Employee
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
          >
            <option value="all">All employees</option>
            {employees.map((employee) => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No attendance records found for the selected view.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => {
                const employee = employeeLookup[entry.employeeId];
                return (
                  <tr key={entry.id}>
                    <td>{entry.date}</td>
                    <td>{employee ? employee.fullName : entry.employeeId}</td>
                    <td>
                      <span className={entry.status === "Present" ? "pill success" : "pill muted"}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
