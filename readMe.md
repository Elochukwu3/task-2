# BACKEND Stage 2 Task: User Authentication & Organisation

## Introduction
This project is aimed at building a backend application for user authentication and organisation management using Express.js and MongoDB.

## Acceptance Criteria
1. **Database Connection**:
   - Connect to a MongoDB database.

2. **User Model**:
   - Properties: `userId`, `firstName`, `lastName`, `email`, `password`, `phone`.
   - Ensure `userId` and `email` are unique.
   - Provide validation for all fields.

3. **Validation**:
   - Return status code 422 for validation errors with detailed error messages.

4. **User Authentication**:
   - **Registration**:
     - Endpoint: `[POST] /auth/register`
     - Hash passwords before storing.
     - Return access token and user details on successful registration.
   - **Login**:
     - Endpoint: `[POST] /auth/login`
     - Return access token and user details on successful login.

5. **Organisation Model**:
   - Properties: `orgId`, `name`, `description`.
   - A user can belong to multiple organisations.
   - Create a default organisation for each new user.

6. **Endpoints**:
   - **User Endpoints**:
     - `[POST] /auth/register`: Register a user and create a default organisation.
     - `[POST] /auth/login`: Log in a user.
     - `[GET] /api/users/:id`: Retrieve user details.
   - **Organisation Endpoints**:
     - `[GET] /api/organisations`: Get all organisations the user belongs to.
     - `[GET] /api/organisations/:orgId`: Get details of a single organisation.
     - `[POST] /api/organisations`: Create a new organisation.
     - `[POST] /api/organisations/:orgId/users`: Add a user to an organisation.


