import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { RecipeCard } from '../../shared/recipe-card/recipe-card';
import { IngredientPicker } from '../../shared/ingredient-picker/ingredient-picker';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { AdminTable } from '../../shared/admin-table/admin-table';

@Component({
  imports: [
    MatButtonModule,
    MatDialogModule,
    RecipeCard,
    IngredientPicker,
    AdminTable,
  ],
  selector: 'app-shared-test',
  styleUrl: './shared-test.css',
  templateUrl: './shared-test.html',
})
export class SharedTest {
  private dialog = inject(MatDialog);

  openConfirmDialog(): void {
    this.dialog.open(ConfirmDialog);
  }
}
