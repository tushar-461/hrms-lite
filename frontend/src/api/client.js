const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

async function handleResponse(response) {
  const isJson = (response.headers.get("content-type") || "").includes("application/json");
  const hasBody = response.status !== 204 && response.body != null;
  const data = isJson && hasBody ? await response.json() : null;

  if (!response.ok) {
    const message =
      (data && (data.message || data.detail)) ||
      (data && data.errors && JSON.stringify(data.errors)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export async function fetchEmployees() {
  const res = await fetch(`${BASE_URL}/employees/`);
  const data = await handleResponse(res);
  const list = Array.isArray(data) ? data : [];
  return list.map((item) => ({
    employeeId: item.employee_id,
    fullName: item.full_name,
    email: item.email,
    department: item.department
  }));
}

export async function createEmployee(payload) {
  const res = await fetch(`${BASE_URL}/employees/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      employee_id: payload.employeeId,
      full_name: payload.fullName,
      email: payload.email,
      department: payload.department
    })
  });
  const data = await handleResponse(res);
  return {
    employeeId: data.employee_id,
    fullName: data.full_name,
    email: data.email,
    department: data.department
  };
}

export async function deleteEmployeeApi(employeeId) {
  const res = await fetch(`${BASE_URL}/employees/${encodeURIComponent(employeeId)}/`, {
    method: "DELETE"
  });
  if (!res.ok && res.status !== 404) {
    await handleResponse(res);
  }
}

export async function fetchAttendance() {
  const res = await fetch(`${BASE_URL}/attendance/`);
  const data = await handleResponse(res);
  const list = Array.isArray(data) ? data : [];
  return list.map((item) => ({
    id: item.id,
    employeeId: item.employee.employee_id,
    date: item.date,
    status: item.status
  }));
}

export async function createAttendance(payload) {
  const res = await fetch(`${BASE_URL}/attendance/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      employee_id: payload.employeeId,
      date: payload.date,
      status: payload.status
    })
  });
  const data = await handleResponse(res);
  return {
    id: data.id,
    employeeId: data.employee.employee_id,
    date: data.date,
    status: data.status
  };
}
