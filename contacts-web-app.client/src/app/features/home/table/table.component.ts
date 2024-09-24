import { UserService } from '../../../core/services/user.service';
import { Component, HostListener } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ContactService } from '../../../core/services/contact.service';
import { Contact } from '../../../core/models/contact';
import { AddContactRequestDTO } from '../../../core/models/addContactRequestDTO';
import { ActionCellRendererComponent } from './action-cell-renderer/action-cell-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  gridApi!: GridApi;
  newContact!: AddContactRequestDTO;
  data: Contact[] = [];
  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true,
  };
  colDefs: ColDef[] = [
    {
      headerName: '#',
      valueGetter: 'node.rowIndex + 1',
      width: 50,
    },
    { field: 'name' },
    { field: 'surname', hide: true, suppressHeaderMenuButton: true },
    { field: 'email', hide: true, suppressHeaderMenuButton: true },
    { field: 'phone' },
    {
      headerName: 'Actions',
      autoHeight: true,
      field: 'actions',
      cellRenderer: ActionCellRendererComponent,
      cellRendererParams: {
        context: {
          componentParent: this,
        },
      },
      width: 150,
      cellStyle: {
        display: 'flex',
        justifyContent: 'center', // Yatay olarak ortalar
        alignItems: 'center', // Dikey olarak ortalar
        textAlign: 'center',
      },
    },
  ];

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  openDetailDialog(rowData: any): void {
    this.dialog.open(ShowDetailComponent, {
      data: rowData,
    });
  }

  onEdit(rowData: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { ...rowData },
    });

    dialogRef.afterClosed().subscribe((contact) => {
      if (contact) {
        contact['id'] = rowData.id;
        contact['phone'] = contact['phone'].toString();
        this.contactService.updateContact(contact).subscribe({
          next: () => {
            this.loadContacts();
            alert('Succesful');
          },
          error: () => {
            alert('error');
          },
        });
      }
    });
  }

  onDelete(rowData: any): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this contact?'
    );
    if (confirmed) {
      this.contactService.deleteContact(rowData.id).subscribe({
        next: () => {
          alert('Succesfull');
          this.loadContacts();
        },
        error: (error) => {
          console.error('Error deleting contact:', error);
          alert('Error deleting contact. Please try again.');
        },
      });
    }
  }

  loadContacts(): void {
    const user = this.authService.getUser();
    if (user) {
      this.contactService
        .getContacts(user.id)
        .subscribe((contacts: Contact[]) => {
          if (this.gridApi) {
            this.gridApi.applyTransaction({ remove: this.data });
            this.data = contacts;
            this.gridApi.applyTransaction({ add: this.data });
            this.gridApi.refreshCells({ force: true });
          }
        });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustColumnSize();
  }

  adjustColumnSize() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.loadContacts();
  }

  ngOnInit(): void {
    this.loadContacts();
  }
  refreshTable() {
    this.loadContacts();
  }

  getRowId(params: any): string {
    return params.data.id;
  }
}
