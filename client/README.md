# Amancom GPS Management System - Frontend

A professional GPS management system built with React, featuring role-based access control, responsive design, and comprehensive device tracking capabilities.

## Features

- **Dashboard**: Overview with statistics and recent activity
- **Client Management**: Add, edit, and manage client information
- **Device Tracking**: Monitor GPS devices and their status
- **SIM Management**: Track SIM cards and data usage
- **Subscription Management**: Handle client subscriptions and renewals
- **Notifications**: System alerts and manual messaging
- **Employee Management**: User roles and permissions (Owner/Admin/Support)
- **Reports**: Analytics and activity logs with export functionality
- **Settings**: Company info, theme customization, and API configuration

## Role-Based Access Control

- **Owner**: Full access to all features including employee management and settings
- **Admin**: Access to most features except employee management and settings
- **Support**: Limited access to view clients, devices, and basic operations

## Technology Stack

- React 18.2.0
- React Router DOM 6.22.3
- Styled Components 6.1.8
- Material UI Icons 7.2.0
- Material UI 7.2.0

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the client directory:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_APP_NAME=Amancom GPS Management
   REACT_APP_VERSION=1.0.0
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Sidebar.js          # Navigation sidebar with role-based menu
│       ├── TopNavbar.js        # Top navigation bar with search and user menu
│       └── MainLayout.js       # Main layout wrapper
├── context/
│   └── AuthContext.js          # Authentication context and JWT handling
├── pages/
│   ├── Dashboard.js            # Main dashboard with statistics
│   ├── Clients.js              # Client management
│   ├── Devices.js              # GPS device tracking
│   ├── SIMs.js                 # SIM card management
│   ├── Subscriptions.js        # Subscription management
│   ├── Notifications.js        # System notifications
│   ├── Employees.js            # Employee management (Owner only)
│   ├── Reports.js              # Analytics and reports (Admin+)
│   ├── Settings.js             # System settings (Owner only)
│   └── Login.js                # Authentication page
└── App.js                      # Main application with routing
```

## API Integration

The frontend communicates with the backend API through the AuthContext. All API calls are centralized and use the `REACT_APP_API_URL` environment variable.

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Authentication Flow

1. Users are redirected to `/login` if not authenticated
2. After successful login, users are redirected to `/dashboard`
3. Role-based access control prevents unauthorized access to protected routes
4. JWT tokens are stored in localStorage for session persistence

## Development Notes

- All components use styled-components for styling
- Material UI icons are used throughout the interface
- Mock data is currently used - replace with actual API calls
- Error handling and loading states are implemented
- Search and filtering functionality is available on list pages

## Backend Requirements

The frontend expects a Node.js/Express backend with the following endpoints:
- Authentication: `/api/auth/login`
- Clients: `/api/clients`
- Devices: `/api/devices`
- SIMs: `/api/sims`
- Subscriptions: `/api/subscriptions`
- Notifications: `/api/notifications`
- Employees: `/api/employees`
- Reports: `/api/reports`
- Settings: `/api/settings`

## License

This project is part of the Amancom GPS Management System. 