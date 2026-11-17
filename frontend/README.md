# Frontend

This is the frontend application for the Hill Recipes project, developed using Angular.

## Technology Stack

- **Angular:** 22.2.7
- **Angular CLI:** 22.2.7
- **Node.js:** 22.23.5
- **npm:** 10.9.9
- **UI Library:** Angular Material 22.2.7
- **Styling:** CSS
- **Linter:** ESLint (angular-eslint 22.7.0)

## Prerequisites

Make sure the following tools are installed:

- Node.js 22
- npm 10
- Angular CLI 22

## Installation

Navigate to the `frontend` directory and install the project dependencies:

```bash
npm install
```

## Development Server

To start the local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to:

http://localhost:4200/

The application automatically reloads whenever source files are modified.

## Code Generation

Angular CLI provides commands for generating application elements.

To generate a component:

```bash
ng generate component component-name
```

For a complete list of available commands:

```bash
ng generate --help
```

## Building

To build the project, run:

```bash
ng build
```

The generated build files are stored in the `dist/` directory.

## Linting

To check the code for potential errors and enforce coding standards, run:

```bash
npx eslint .
```

## Testing

To execute unit tests, run:

```bash
ng test
```

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Material Documentation](https://material.angular.dev/)
- [ESLint Documentation](https://eslint.org/)