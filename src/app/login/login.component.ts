import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


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

  constructor(private router: Router, private messageService: MessageService) {}

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
    const validEmail = 'mom@kitchen.com';
    const validPassword = 'kitchen123';

    if (this.email === validEmail && this.password === validPassword) {
      // Show success message
      this.messageService.add({ severity: 'success', summary: 'Uspjeh', detail: 'Uspješno ste se prijavili.' });

      // Add delay before navigating
      setTimeout(() => {
        if (this.rememberMe) {
          localStorage.setItem('email', this.email);
          localStorage.setItem('password', this.password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }

        // Navigate to the dashboard
        this.router.navigate(['dashboard']);
      }, 1000); // (1000 ms = 1 second)

    } else {
      this.messageService.add({ severity: 'error', summary: 'Pogreška', detail: 'Neispravan email ili lozinka.' });
    }
  }
}
