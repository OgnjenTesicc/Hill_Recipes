import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'app-admin-table',
  styleUrl: './admin-table.css',
  templateUrl: './admin-table.html',
})
export class AdminTable implements AfterViewInit {
  displayedColumns = ['name', 'category', 'difficulty', 'time'];

  dataSource = new MatTableDataSource([
    { name: 'Pasta Carbonara', category: 'Pasta', difficulty: 'Medium', time: 25 },
    { name: 'Chicken Salad', category: 'Salad', difficulty: 'Easy', time: 15 },
    { name: 'Beef Burger', category: 'Fast Food', difficulty: 'Medium', time: 30 },
    { name: 'Vegetable Soup', category: 'Soup', difficulty: 'Easy', time: 20 },
    { name: 'Chocolate Cake', category: 'Dessert', difficulty: 'Hard', time: 60 },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.paginator.firstPage();
  }
}
