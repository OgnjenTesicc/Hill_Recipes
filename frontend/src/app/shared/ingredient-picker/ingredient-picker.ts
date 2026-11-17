
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'app-ingredient-picker',
  styleUrl: './ingredient-picker.css',
  templateUrl: './ingredient-picker.html',
})
export class IngredientPicker {
  ingredients = ['Tomato', 'Cheese', 'Chicken', 'Onion', 'Pepper', 'Potato'];
  selectedIngredients: string[] = [];
  searchValue = '';

  get filteredIngredients(): string[] {
    return this.ingredients.filter(
      ingredient =>
        ingredient.toLowerCase().includes(this.searchValue.toLowerCase()) &&
        !this.selectedIngredients.includes(ingredient)
    );
  }

  addIngredient(ingredient: string): void {
    if (!this.selectedIngredients.includes(ingredient)) {
      this.selectedIngredients.push(ingredient);
    }

    this.searchValue = '';
  }

  removeIngredient(ingredient: string): void {
    this.selectedIngredients = this.selectedIngredients.filter(
      item => item !== ingredient
    );
  }
}
