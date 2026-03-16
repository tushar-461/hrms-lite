const STORAGE_KEY = "hrms_lite_store";

export function readStore() {
  const fallback = { employees: [], attendance: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      employees: Array.isArray(parsed.employees) ? parsed.employees : [],
      attendance: Array.isArray(parsed.attendance) ? parsed.attendance : []
    };
  } catch {
    return fallback;
  }
}

export function writeStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
