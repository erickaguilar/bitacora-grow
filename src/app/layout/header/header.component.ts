import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent {

  @Output() menuToggled = new EventEmitter<boolean>();

  constructor(
    private router: Router
  ) { }

  public toggleMenu(): void {
    this.menuToggled.emit();
  }

  public routes(dir: string): void {
    this.router.navigate([dir]);
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

}
