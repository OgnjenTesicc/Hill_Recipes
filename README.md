# Recepti

Timski projekat (MBRS, IKS, ISS): aplikacija za recepte. Klijent je Angular, server je Spring Boot.

## Struktura repozitorijuma
- `frontend` - Angular klijent
- `backend` - Spring Boot server (Maven)
- `docs` - dokumentacija, arhitektura, dijagrami

## Verzije
- Java 21
- Node 22.12 ili novija
- UI biblioteka: Angular Material
- Baza: PostgreSQL

## Pokretanje
(upisuju S1-0.1 za frontend i S2-0.2 za backend)

## Grane
- `main` - samo za kontrolne tačke i odbrane
- `develop` - glavna grana za rad, podrazumevana
- `feature/id-kratak-opis` - jedna grana za jednu Trello karticu, npr. `feature/s1-0.1-angular-projekat`
- `bugfix/id-kratak-opis` - ispravke grešaka
- Niko ne radi direktno na `develop` ni na `main`.

## Poruke komita
Format: `tip: kratak opis` (najviše oko 72 znaka, jedan komit = jedna celina).
Tipovi: `feat`, `fix`, `refactor`, `docs`, `style`.
Zabranjeno: "changes", "update", "fix" (samo), "new version", "rad".

## Pull request
Svaka izmena ide u `develop` preko pull request-a koji pregleda drugi član tima.
Ognjen pregleda Nikolu, Nikola pregleda Danila, Danilo pregleda Ognjena.
PR mora da ima link ka Trello kartici, opis izmena i napomenu o problemima.

## Tim
- Ognjen Tešić (S1)
- Nikola Marić (S2), Product Owner
- Danilo Torbica (S3), Scrum Master