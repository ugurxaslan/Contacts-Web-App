import { Component, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild(TableComponent) tableComponent!: TableComponent;

  onFormSuccess() {
    this.tableComponent.refreshTable(); // Tabloyu yenile
  }
}
