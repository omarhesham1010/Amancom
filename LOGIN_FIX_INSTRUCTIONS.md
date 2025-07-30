# Login Issue Fix Instructions

## Problem
You're getting the error: `❌ Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

This happens when the frontend expects JSON but receives HTML (usually a 404 page or server error).

## Root Causes Identified

1. **Missing Environment Variables**: The server needs database configuration
2. **Missing API URL Configuration**: The frontend doesn't know where to send requests
3. **Database Connection Issues**: The server can't connect to the database

## Step-by-Step Fix

### 1. Create Server Environment File

Create a file named `.env` in the `server/` directory with the following content:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=amancom

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
```

**Important**: Replace `your_mysql_password` with your actual MySQL password.

### 2. Create Client Environment File

Create a file named `.env` in the `client/` directory with the following content:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 3. Set Up Database

Make sure you have:
- MySQL server running
- Database named `amancom` created
- `Users` table with the required columns

### 4. Test the Setup

#### Option A: Test with Database
1. Start the server: `cd server && npm start`
2. Start the client: `cd client && npm start`
3. Try logging in

#### Option B: Test without Database (Quick Fix)
1. Stop the server if it's running
2. Run the test server: `cd server && node test-server.js`
3. Start the client: `cd client && npm start`
4. Try logging in with any username/password

### 5. Verify the Fix

The login should now work. If you're using the test server, any username/password combination will work.

## Common Issues

1. **Port Conflicts**: Make sure port 5000 is available
2. **CORS Issues**: The server is configured to allow requests from `http://localhost:3000`
3. **Database Connection**: Ensure MySQL is running and the credentials are correct

## Files Modified

- `server/controllers/loginController.js`: Fixed error message that was exposing password
- `server/env.example`: Created example environment file
- `client/env.example`: Created example environment file
- `server/test-server.js`: Created test server for debugging

## Next Steps

1. Create the `.env` files as described above
2. Set up your MySQL database
3. Test the login functionality
4. If using the test server, switch back to the main server once database is configured 