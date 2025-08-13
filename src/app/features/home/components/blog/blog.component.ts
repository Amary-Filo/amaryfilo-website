import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BlogLatest } from '@core/data/latest.model';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  standalone: true,
})
export class BlogComponent {
  latestPost = input<BlogLatest[]>();
  isFallback = input<boolean>();
}
