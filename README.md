# HRMS Lite Project

## Overview
HRMS Lite is a lightweight, full-stack human resources management system designed for small teams and learning projects.

- Backend: Django REST Framework API for employee and attendance management.
- Frontend: React + Vite for an interactive single-page UI.
- Database: SQLite (default), easy setup on local machine.

## Goals
  - Manage employees (create, list, detail, delete)
  - Track attendance records (list, filter by employee, create)
- Focus on clear separation between API and frontend.
- Make deployment and local development fast and repeatable.

## Features
- Employee CRUD (create, read, delete)
- Attendance logging with timestamp and employee association
- Filtering attendance by employee
- Responsive UI with forms and data tables
- CORS support for local separate-host development

## Project Structure
- `frontend/` - React + Vite UI
- `backend/` - Django REST API

## Tech Stack
- React 18 + Vite
- Django 4.x + Django REST Framework
- SQLite local DB
- Axios for API calls

## Setup
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

## Environment
- **Frontend:** Copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_BASE_URL` to backend API URL (e.g. `http://127.0.0.1:8000/api`).
- **Backend:** Copy `backend/.env.example` to `backend/.env` and set `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, and `CORS_ALLOWED_ORIGINS`.
- `.env` files are gitignored; do not commit secrets.

## API Endpoints
- `GET /api/employees/` - list employees
- `POST /api/employees/` - create employee
- `GET /api/employees/<employee_id>/` - retrieve employee
- `DELETE /api/employees/<employee_id>/` - delete employee
- `GET /api/attendance/` - list attendance records
- `GET /api/attendance/?employee_id=EMP-101` - filter records by employee
- `POST /api/attendance/` - create attendance record

## Development Shortcuts
From repository root:
```bash
npm install
npm run dev:frontend
```

## Notes
- This project is intended for training/ideation and can be a starting point for adding authentication, role-based permissions, and production-grade database backends.

