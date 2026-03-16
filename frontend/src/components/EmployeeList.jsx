export default function EmployeeList({ employees, onDelete }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Employees</h2>
        <span>{employees.length} total</span>
      </div>

      {employees.length === 0 ? (
        <p className="empty">No employees yet. Add your first employee to get started.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employeeId}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.fullName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button
                      type="button"
                      className="danger ghost"
                      onClick={() => onDelete(employee.employeeId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
