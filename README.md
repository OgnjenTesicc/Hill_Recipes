# Recipes

Team project (MBRS, IKS, ISS): a recipes application. The client is built with Angular and the server with Spring Boot.

## Repository structure
- `frontend` - Angular client
- `backend` - Spring Boot server (Maven)
- `docs` - documentation, architecture, diagrams

## Versions
- Java 21
- Node 22.12 or newer
- UI library: Angular Material
- Database: PostgreSQL

## Running the project
(to be added in S1-0.1 for the frontend and S2-0.2 for the backend)

## Branches
- `main` - only for checkpoints and defenses
- `develop` - main working branch, default
- `feature/id-short-description` - one branch per Trello card, e.g. `feature/s1-0.1-angular-project`
- `bugfix/id-short-description` - bug fixes
- Nobody commits directly to `develop` or `main`.
- `develop` and `main` are protected: changes only through a pull request with one approval.

## Commit messages
Format: `type: short description` (up to about 72 characters, one commit = one logical unit).
Types: `feat`, `fix`, `refactor`, `docs`, `style`.
Not allowed: "changes", "update", "fix" (alone), "new version", "work".

## Pull requests
Every change goes into `develop` through a pull request reviewed by another team member.
A PR must contain the Trello card link, a description of changes and a note about problems.

## Team
- Ognjen Tešić (S1)
- Nikola Marić (S2), Product Owner
- Danilo Torbica (S3), Scrum Master