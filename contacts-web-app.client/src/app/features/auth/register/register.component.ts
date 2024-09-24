import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AddUserRequestDTO } from '../../../core/models/addUserRequestDTO';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isSubmiting = false;
  newUserForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: this.matchPasswordsValidator() }
  );

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    this.isSubmiting = true;
    const newUser = new AddUserRequestDTO(
      this.newUserForm.value.name!,
      this.newUserForm.value.surname!,
      this.newUserForm.value.email!,
      this.newUserForm.value.password!
    );

    this.userService.addUser(newUser).subscribe({
      next: (user: User) => {
        if (user != null && user != undefined) {
          this.router.navigate(['/login']);
          alert(`Kayıt başarılı. Lütfen giriş yapınız.`);
        } else alert('Yeni kullanıcı oluşturulamadı');
        this.isSubmiting = false;
      },
      error: (error) => {
        alert('Yeni kullanıcı oluşturulamadı: ' + error.message);
        this.isSubmiting = false;
      },
    });
  }

  matchPasswordsValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const repeatPassword = formGroup.get('repeatPassword')?.value;
      return password === repeatPassword ? null : { passwordsMismatch: true };
    };
  }
}
