import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // ReactiveFormsModule ekleniyor
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { SettingsComponent } from './features/settings/settings.component';
import { HeaderComponent } from './shared/header/header.component';
import { TableComponent } from './features/home/table/table.component';
import { AgGridModule } from 'ag-grid-angular';
import { NewContactFormComponent } from './features/home/new-contact-form/new-contact-form.component';
import { ActionCellRendererComponent } from './features/home/table/action-cell-renderer/action-cell-renderer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogComponent } from './features/home/table/dialog/dialog.component';
import { ShowDetailComponent } from './features/home/table/show-detail/show-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SettingsComponent,
    HeaderComponent,
    TableComponent,
    NewContactFormComponent,
    ActionCellRendererComponent,
    DialogComponent,
    ShowDetailComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule,
    FormsModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
