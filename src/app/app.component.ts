import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'moms-kitchen';

  constructor(private renderer: Renderer2) {}

  toggleMobileMenu() {
    const body = document.querySelector('body');
    const navMenu = document.getElementById('navmenu');
    const hamburger = document.getElementById('hamburger');
    const closeIcon = document.getElementById('close-icon');
  
    if (body && navMenu && hamburger && closeIcon) {
      const isActive = body.classList.contains('mobile-nav-active');
  
      if (isActive) {
        this.renderer.removeClass(body, 'mobile-nav-active');
        this.renderer.removeClass(navMenu, 'mobile-nav-active');
        hamburger.style.display = 'block';
        closeIcon.style.display = 'none';
      } else {
        this.renderer.addClass(body, 'mobile-nav-active');
        this.renderer.addClass(navMenu, 'mobile-nav-active');
        hamburger.style.display = 'none';
        closeIcon.style.display = 'block';
      }
    }
  }

  closeMobileMenu() {
    const body = document.querySelector('body');
    const navMenu = document.getElementById('navmenu');
    const hamburger = document.getElementById('hamburger');
    const closeIcon = document.getElementById('close-icon');
  
    if (body && navMenu && hamburger && closeIcon) {
      this.renderer.removeClass(body, 'mobile-nav-active');
      this.renderer.removeClass(navMenu, 'mobile-nav-active');
      hamburger.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  }
}
