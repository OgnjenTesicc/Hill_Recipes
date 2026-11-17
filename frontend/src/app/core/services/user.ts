import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/models/user';

@Service()
export class UserService {

  private users: User[] = [
    {
      id: 1,
      username: 'test_korisnik',
      email: 'test@gmail.com',
      firstName: 'Test',
      lastName: 'Korisnik',
      role: 'USER'
    },
    {
      id: 2,
      username: 'admin',
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Administrator',
      role: 'ADMIN'
    }
  ];

  getAll(): Observable<User[]> {
    return of(this.users);
  }

  getById(id: number): Observable<User | undefined> {
    return of(this.users.find(user => user.id === id));
  }
}