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