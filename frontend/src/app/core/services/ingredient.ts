import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ingredient } from '../../shared/models/ingredient';

@Service()
export class IngredientService {

  private ingredients: Ingredient[] = [
    {
      id: 1,
      name: 'Milk',
      description: 'Fresh cow milk',
      unit: 'ml',
      allergenIds: [1]
    },
    {
      id: 2,
      name: 'Eggs',
      description: 'Fresh chicken eggs',
      unit: 'pieces',
      allergenIds: [2]
    },
    {
      id: 3,
      name: 'Flour',
      description: 'Wheat flour',
      unit: 'g',
      allergenIds: [3]
    },
    {
      id: 4,
      name: 'Tomato',
      description: 'Fresh tomato',
      unit: 'pieces',
      allergenIds: []
    }
  ];

  getAll(): Observable<Ingredient[]> {
    return of(this.ingredients);
  }

  getById(id: number): Observable<Ingredient | undefined> {
    return of(this.ingredients.find(ingredient => ingredient.id === id));
  }
}