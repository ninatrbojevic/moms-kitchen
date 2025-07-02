import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../dashboard/services/auth.service';
import { AuthResponse } from '../models/auth-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  login(): void {

    let loginRequest = {
      username: this.email,
      password: this.password
    }

    this.authService.login(loginRequest).subscribe((response: AuthResponse) => {
      localStorage.setItem('token', response.token);
      this.router.navigateByUrl('dashboard');
    }, (error) => {
      console.log("Error loging in: " + error.error)
    })
  }
}
