# Backend

This is the Spring Boot backend for the Hill Recipes project.

## Technologies

- **Framework:** Spring Boot
- **Java:** 21
- **Build tool:** Maven
- **Database:** PostgreSQL

## Database Configuration

The application uses a PostgreSQL database named `hill_recipes`.

Before starting the application, make sure PostgreSQL is running and the database has been created.

Set the following environment variable containing your PostgreSQL password:

```powershell
$env:DB_PASSWORD="your_password"
```

The database password is read from the `DB_PASSWORD` environment variable and is not stored directly in the application configuration.

## JWT Configuration

The server signs login tokens (JWT) with a secret key. The key is read from the `JWT_SECRET` environment variable and is not stored in the application configuration.

The value must be a Base64-encoded string of at least 32 bytes. To generate one in PowerShell and set it for the current terminal session:

```powershell
$b = New-Object byte[] 48
(New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($b)
$env:JWT_SECRET = [Convert]::ToBase64String($b)
```

To store it permanently for your user, run this in the same terminal and then restart the terminal (or IntelliJ):

```powershell
[Environment]::SetEnvironmentVariable("JWT_SECRET", $env:JWT_SECRET, "User")
```

Tokens are valid for 24 hours (`app.jwt.expiration-ms` in `application.properties`).

## Authentication

- `POST /api/auth/login` accepts `{ "usernameOrEmail": "...", "password": "..." }` and returns `{ "token": "..." }`.
- Wrong credentials return `401`, a not yet activated account returns `403`.
- All endpoints except `/api/auth/**` and `/api/test/**` require the header `Authorization: Bearer <token>`.

## Running the Application

The application can be started from the `backend` folder using the Maven Wrapper.

On Windows, run:

```powershell
.\mvnw.cmd spring-boot:run
```

After successful startup, the application is available at:

http://localhost:8080

## Test Endpoint

To verify that the backend is running, open:

http://localhost:8080/api/test

Expected response:

```text
ok
```