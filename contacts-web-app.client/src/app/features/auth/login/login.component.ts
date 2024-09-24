import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { LoginRequestDTO } from '../../../core/models/loginRequestDTO';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLogin = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLogin = true;
    const loginF = new LoginRequestDTO(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );

    this.authService.login(loginF).subscribe({
      next: (user) => {
        if (user != null) {
          this.router.navigate(['/home']);
          alert(`Hoşgeldiniz ${user.name}`);
        } else alert('kullanıcı bulunamadı');
        this.isLogin = false;
      },
      error: (error) => {
        alert(error.message);
        console.log(error.message);
        this.isLogin = false;
      },
    });
  }
}
