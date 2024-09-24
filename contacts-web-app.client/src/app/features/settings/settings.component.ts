import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service'; // Kullanıcı işlemleri için
import { Router } from '@angular/router';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginRequestDTO } from '../../core/models/loginRequestDTO';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  user: User | null;
  settingsForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.user = this.authService.getUser();
    this.settingsForm = this.fb.group({
      name: [`${this.user?.name}`, [Validators.required]],
      surname: [`${this.user?.surname}`, [Validators.required]],
      email: [`${this.user?.email}`, [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [
          this.matchPasswordsValidator(),
          this.missMatchPaswordValidator(),
        ],
      }
    );
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  // Kullanıcı bilgilerini düzenleme fonksiyonu
  updateUserInfo() {
    if (
      this.user?.name != this.settingsForm.get('name')?.value ||
      this.user?.surname != this.settingsForm.get('surname')?.value ||
      this.user?.email != this.settingsForm.get('email')?.value
    ) {
      if (this.settingsForm.valid) {
        const isConfirmed = window.confirm(
          'Are you sure you want to update the user information?'
        );
        if (isConfirmed) {
          this.user!.name = this.settingsForm.get('name')?.value;
          this.user!.surname = this.settingsForm.get('surname')?.value;
          this.user!.email = this.settingsForm.get('email')?.value;

          const requestDTO = User.to_addRequestDTO(this.user!);
          this.userService.updateUser(this.user!.id, requestDTO).subscribe(
            (response) => {
              if (response != null) {
                alert('Kullanıcı bilgileri başarıyla güncellendi.');
                sessionStorage.setItem('user', JSON.stringify(response));
                console.log(this.user);
              } else {
                alert('Kullanıcı bilgileri güncellenirken bir hata oluştu.');
              }
            },
            (error) => {
              alert('Kullanıcı bilgileri güncellenirken bir hata oluştu.');
            }
          );
        }
      }
    } else {
      alert('No changes have been made.');
    }
  }

  // Şifre değiştirme fonksiyonu
  changePassword() {
    if (this.settingsForm.valid) {
      const isConfirmed = window.confirm(
        'Are you sure you want to update the password?'
      );
      if (isConfirmed) {
        const currentPass = this.passwordForm.get('currentPassword')?.value;
        const newPass = this.passwordForm.get('newPassword')?.value;
        this.authService
          .isTruePassword(new LoginRequestDTO(this.user!.email, currentPass))
          .subscribe(
            (response) => {
              if (response != null) {
                const updatedUser = User.to_addRequestDTO(this.user!);
                updatedUser.encrypted_Password = newPass;
                console.log(updatedUser);
                console.log(this.user);
                this.userService
                  .updateUser(this.user!.id, updatedUser)
                  .subscribe(
                    (response) => {
                      if (response != null) {
                        alert('Parola değiştirme başarılı');
                      } else {
                        alert('kullanıcı bulunamadı');
                      }
                    },
                    (error) => {
                      alert('parola değiştirilirken bir hata ile karşılaşıldı');
                    }
                  );
              } else {
                alert('Hatalı Parola');
              }
            },
            (error) => {
              alert('parola değiştirilirken bir hata ile karşılaşıldı');
            }
          );
      }
    }

    this.passwordForm.reset();
  }

  // Hesap silme fonksiyonu
  deleteAccount() {
    const confirmed = confirm(
      'Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.'
    );
    if (confirmed) {
      this.userService.deleteUser(this.user!.id).subscribe(
        (response) => {
          alert('Hesabınız başarıyla silindi.');
          sessionStorage.clear(); // Kullanıcı verilerini temizle
          this.router.navigate(['/']); // Ana sayfaya yönlendir
        },
        (error) => {
          alert('Hesap silinirken bir hata oluştu.');
        }
      );
    }
  }

  missMatchPaswordValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const newPassword = formGroup.get('newPassword')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return newPassword === confirmPassword
        ? null
        : { passwordsMismatch: true };
    };
  }
  matchPasswordsValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const newPassword = formGroup.get('newPassword')?.value;
      const currentPassword = formGroup.get('currentPassword')?.value;
      return newPassword !== currentPassword
        ? null
        : { passwordsMismatch: true };
    };
  }
}
