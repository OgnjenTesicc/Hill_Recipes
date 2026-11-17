import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Allergen } from '../../shared/models/allergen';

@Service()
export class AllergenService {

  private allergens: Allergen[] = [
    {
      id: 1,
      name: 'Milk',
      description: 'Contains milk and dairy products.'
    },
    {
      id: 2,
      name: 'Eggs',
      description: 'Contains eggs and egg products.'
    },
    {
      id: 3,
      name: 'Gluten',
      description: 'Contains wheat and gluten.'
    }
  ];

  getAll(): Observable<Allergen[]> {
    return of(this.allergens);
  }

  getById(id: number): Observable<Allergen | undefined> {
    return of(this.allergens.find(allergen => allergen.id === id));
  }
}