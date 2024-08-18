import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail && storedPassword) {
      this.email = storedEmail;
      this.password = storedPassword;
      this.rememberMe = true;
    }
  }

  login(): void {
    const validEmail = 'user@example.com';
    const validPassword = 'password123';

    if (this.email === validEmail && this.password === validPassword) {
      this.router.navigate(['dashboard']);

      if (this.rememberMe) {
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      
    } else {
      alert('Invalid email or password.');
    }
  }
}
