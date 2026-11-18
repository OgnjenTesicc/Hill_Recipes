import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
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
export class SharedTest implements OnInit {
  private dialog = inject(MatDialog);
  private http = inject(HttpClient);

  backendResponse = '';

  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/test', {
      responseType: 'text'
    }).subscribe({
      next: response => this.backendResponse = response,
      error: error => this.backendResponse = 'Greška: ' + error.status
    });
  }

  openConfirmDialog(): void {
    this.dialog.open(ConfirmDialog);
  }
}