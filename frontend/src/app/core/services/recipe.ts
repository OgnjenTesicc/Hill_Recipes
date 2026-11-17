import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../../shared/models/recipe';

@Service()
export class RecipeService {

  private recipes: Recipe[] = [
    {
      id: 1,
      title: 'Pasta Carbonara',
      description: 'Traditional Italian pasta with eggs, cheese and bacon.',
      preparationTime: 25,
      servings: 2,
      difficulty: 'EASY',
      authorId: 1
    },
    {
      id: 2,
      title: 'Chicken Salad',
      description: 'Fresh salad with grilled chicken and vegetables.',
      preparationTime: 30,
      servings: 3,
      difficulty: 'MEDIUM',
      authorId: 1
    }
  ];

  getAll(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  getById(id: number): Observable<Recipe | undefined> {
    return of(this.recipes.find(recipe => recipe.id === id));
  }
}