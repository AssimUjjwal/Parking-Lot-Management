# Parking Management System

## Overview

This project is a comprehensive backend system built with Node.js, Express.js, MongoDB, Mongoose, JWT, and bcrypt. It includes features for managing parking levels, parking spaces, and transactions, with robust user authentication and authorization.

## Features

- **User Authentication**: Registration, login, logout, and password management.
- **Token-Based Authentication**: Access and refresh tokens for secure access.
- **Parking Management**: CRUD operations for parking levels, parking spaces, and parking transactions.
- **User and Admin Routes**: Respective user and admin role based API response.

## API Endpoints

### Parking Levels

1. **Get All Parking Levels**
   - **Endpoint**: `GET /api/v1/parking-levels`
   - **Description**: Retrieves a list of all parking levels.

2. **Get Parking Level By ID**
   - **Endpoint**: `GET /api/parking-levels/:id`
   - **Description**: Retrieves a single parking level by its ID.

### Parking Spaces

1. **Get All Parking Spaces**
   - **Endpoint**: `GET /api/v1/parking-spaces`
   - **Query Parameters**:
     - `type` (optional): Type of parking space (e.g., '2-wheeler', '4-wheeler').
     - `parkingLevelId` (optional): ID of the parking level to filter by.
     - `isAvailable` (optional): Availability status (`true` or `false`).
   - **Description**: Retrieves a list of parking spaces based on optional filters.

2. **Get Parking Space By ID**
   - **Endpoint**: `GET /api/v1/parking-spaces/:id`
   - **Description**: Retrieves a single parking space by its ID.

### Parking Transactions

1. **Get All Parking Transactions**
   - **Endpoint**: `GET /api/v1/parking-transactions`
   - **Query Parameters**:
     - `userId` (optional): Filter by user ID.
     - `vehicleNo` (optional): Filter by vehicle number.
     - `startDate` (optional): Start date for date range filter.
     - `endDate` (optional): End date for date range filter.
   - **Description**: Retrieves a list of parking transactions based on optional filters and **role (user or admin)**.

2. **Get Parking Transaction By ID**
   - **Endpoint**: `GET /api/v1/parking-transactions/:id`
   - **Description**: Retrieves a single parking transaction by its ID.

3. **Create Parking Transaction**
   - **Endpoint**: `POST /api/v1/parking-transactions`
   - **Body Parameters**:
     - `parkingLevelId`: ID of the parking level.
     - `type`: Type of vehicle (e.g., '2-wheeler', '4-wheeler').
     - `parkingSpaceId`: ID of the parking space.
     - `bookingDateTime`: Date and time of booking.
     - `vehicleNo`: Vehicle number.
   - **Description**: Creates a new parking transaction.

4. **Release Parking Transaction**
   - **Endpoint**: `PATCH /api/v1/parking-transactions/:id`
   - **Description**: Releases a parking transaction, marking the space as available and calculating the fees.

### User Authentication

1. **Register User**
   - **Endpoint**: `POST /api/V1/users/register`
   - **Body Parameters**:
     - `fullName`: Full name of the user.
     - `email`: Email address.
     - `username`: Username.
     - `password`: Password.
   - **Description**: Registers a new user.

2. **Login User**
   - **Endpoint**: `POST /api/V1/users/login`
   - **Body Parameters**:
     - `email` (optional): Email address.
     - `username` (optional): Username.
     - `password`: Password.
   - **Description**: Logs in a user and returns access and refresh tokens.

3. **Logout User**
   - **Endpoint**: `POST /api/V1/users/logout`
   - **Description**: Logs out the current user by invalidating the access and refresh tokens.

4. **Refresh Access Token**
   - **Endpoint**: `POST /api/V1/users/refresh`
   - **Cookies**: `refreshToken`
   - **Description**: Refreshes the access token using the refresh token provided in cookies.

5. **Change Current Password**
   - **Endpoint**: `PUT /api/V1/users/change-password`
   - **Body Parameters**:
     - `oldPassword`: Current password.
     - `newPassword`: New password.
   - **Description**: Changes the current password for the authenticated user.

6. **Get Current User**
   - **Endpoint**: `GET /api/V1/users/me`
   - **Description**: Retrieves the details of the currently authenticated user.

7. **Update Account Details**
   - **Endpoint**: `PUT /api/V1/users/me`
   - **Body Parameters**:
     - `fullName` (optional): Updated full name.
     - `email` (optional): Updated email address.
   - **Description**: Updates account details of the currently authenticated user.

## Middleware

### `verifyJWT`
- **Description**: Middleware for verifying JWT tokens. It ensures that requests have a valid token and adds the user information to the request object (`req.user`).
- **Usage**: Apply this middleware to routes that require authentication.

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Ensure that you follow the project's coding standards and guidelines.

## License

This project is licensed under the MIT License.