import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BlogLatest } from '@core/data/latest.model';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, TranslatePipe, RouterLinkWithLangDirective],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  standalone: true,
})
export class BlogComponent {
  latestPost = input<BlogLatest[]>();
  isFallback = input<boolean>();
}
