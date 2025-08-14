import { Component } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [SocialLinksComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
})
export class FooterComponent {}
