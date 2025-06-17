import { Component, Renderer2, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'moms-kitchen';
  activeLink: string = '#hero';

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        if (url.includes('/recipes')) {
          this.activeLink = 'recipes';
        } else if (url.includes('/login')) {
          this.activeLink = 'login';
        } else if (url.includes('#about')) {
          this.activeLink = '#about';
        } else if (url.includes('#favorites')) {
          this.activeLink = '#favorites';
        } else if (url.includes('#contact')) {
          this.activeLink = '#contact';
        } else {
          this.activeLink = '#hero';
        }
      });
  }

  ngOnInit(): void {
    this.setupScrollSpy();
  }

  setActive(link: string) {
    this.activeLink = link;
  }

  setupScrollSpy() {
    const sections = ['#hero', '#about', '#favorites', '#contact'];
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const routePath = this.router.url;

          if (!routePath.includes('/recipes') && !routePath.includes('/login')) {
            this.activeLink = '#' + entry.target.id;
          }
        }
      });
    }, observerOptions);

    sections.forEach(selector => {
      const section = document.querySelector(selector);
      if (section) {
        observer.observe(section);
      }
    });
  }

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
