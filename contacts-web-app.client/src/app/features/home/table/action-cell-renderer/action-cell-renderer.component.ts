import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { ShowDetailComponent } from '../show-detail/show-detail.component';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrl: './action-cell-renderer.component.css',
})
export class ActionCellRendererComponent {
  params!: ICellRendererParams;

  constructor(private dialog: MatDialog) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onEditClick(event: MouseEvent): void {
    event.stopPropagation();
    this.params.context.componentParent.onEdit(this.params.data);
  }

  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.params.context.componentParent.onDelete(this.params.data);
  }

  onShowDetails(event: MouseEvent): void {
    event.stopPropagation();
    this.params.context.componentParent.openDetailDialog(this.params.data);
  }
}
