import React from "react";
import { departments } from "../data/constants";

const initialState = {
  employeeId: "",
  fullName: "",
  email: "",
  department: departments[0]
};

export default function EmployeeForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = React.useState(initialState);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
    setForm(initialState);
  }

  return (
    <section className="panel">
      <h2>Add Employee</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Employee ID
          <input
            value={form.employeeId}
            onChange={(e) => updateField("employeeId", e.target.value)}
            placeholder="EMP-101"
            required
          />
        </label>

        <label>
          Full Name
          <input
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Ava Patel"
            required
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="ava@company.com"
            required
          />
        </label>

        <label>
          Department
          <select
            value={form.department}
            onChange={(e) => updateField("department", e.target.value)}
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Employee"}
        </button>
      </form>
    </section>
  );
}
