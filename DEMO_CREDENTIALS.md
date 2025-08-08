# Demo Login Credentials

This document contains the demo login credentials for the Springfield University ERP System.

## Available Demo Accounts

### 1. System Administrator
- **Email**: `admin@example.com`
- **Password**: `password`
- **Role**: Administrator
- **Access**: Full system access including user management, settings, and all modules

### 2. Finance Manager
- **Email**: `finance@example.com`
- **Password**: `finance123`
- **Role**: Finance Manager
- **Access**: Financial operations including payroll, procurement, reports, and fixed assets

### 3. HR Manager
- **Email**: `hr@example.com`
- **Password**: `hr123`
- **Role**: HR Manager
- **Access**: Human resources operations including payroll, employee records, and leave management

## Login Instructions

1. Navigate to the application URL (http://localhost:3001)
2. You will be automatically redirected to the login page
3. Enter one of the email/password combinations above
4. Click "Sign In" to access the system
5. You will be redirected to the dashboard upon successful login

## Features Available After Login

- **Dashboard**: Overview with KPIs and analytics
- **Student Accounts**: Student management and fee tracking
- **Project Accounts**: Project budget and expense management
- **Payroll**: Employee payroll management with form creation
- **Procurement**: Purchase order management
- **Fixed Assets**: Asset management with depreciation tracking
- **Reports**: Analytics and reporting with interactive charts
- **Settings**: System configuration and administration
- **Inventory**: Inventory management (basic page)

## Security Features

- **Session Management**: User sessions are stored in localStorage
- **Protected Routes**: All application routes require authentication
- **Role-Based Access**: Different roles have different permissions (UI shows all for demo)
- **Logout Functionality**: Click on user avatar in top-right corner and select "Logout"

## Notes

- This is a demo system with mock authentication
- In production, implement proper authentication with secure password hashing
- User data is stored in localStorage for demo purposes
- All data shown is mock data for demonstration

## Troubleshooting

If you encounter login issues:
1. Clear your browser's localStorage
2. Refresh the page
3. Try using the exact credentials listed above
4. Check the browser console for any error messages

## Development

The authentication system is implemented using:
- React Context API for state management
- localStorage for session persistence
- Protected route components
- Mock user database for demo purposes

For production deployment, replace the mock authentication with a proper backend authentication service.
