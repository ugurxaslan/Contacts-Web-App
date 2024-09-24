import { Component, EventEmitter, Output } from '@angular/core';
import { ContactService } from '../../../core/services/contact.service';
import { AddContactRequestDTO } from '../../../core/models/addContactRequestDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-contact-form',
  templateUrl: './new-contact-form.component.html',
  styleUrl: './new-contact-form.component.css',
})
export class NewContactFormComponent {
  @Output() formSubmitSuccess = new EventEmitter<void>();
  formVisible = false;
  loading = false;
  message = '';
  userId = '';

  newContactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl(''),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', [Validators.required]),
  });

  constructor(public contactService: ContactService) {}

  toggleForm() {
    this.formVisible = !this.formVisible;
  }

  showLoading() {
    this.loading = true;
  }

  showMessage(): Promise<void> {
    return new Promise<void>((resolve) => {
      alert(this.message);
      resolve();
    });
  }

  onSubmit() {
    const userJson = JSON.parse(sessionStorage.getItem('user')!);
    this.userId = userJson['id'];

    this.formVisible = false;
    this.showLoading();
    if (this.newContactForm.valid)
      this.contactService
        .addContact(this.userId, this.formToContactDTO())
        .subscribe({
          next: async () => {
            this.loading = false;
            this.message = 'İşlem Başarılı!';
            await this.showMessage();
            this.formSubmitSuccess.emit();
            this.cancel();
          },
          error: async () => {
            this.loading = false;
            this.message = 'İşlem Başarısız!';
            await this.showMessage();
            this.formVisible = true;
          },
        });
  }

  cancel() {
    this.formVisible = false;
    this.newContactForm.reset();
  }

  formToContactDTO(): AddContactRequestDTO {
    return new AddContactRequestDTO(
      this.newContactForm.get('name')?.value ?? '',
      this.newContactForm.get('surname')?.value ?? '',
      this.newContactForm.get('email')?.value ?? '',
      this.newContactForm.get('phone')?.value?.toString() ?? ''
    );
  }
}
