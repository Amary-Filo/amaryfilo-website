import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  DesignsLatest,
  ProjectLatest,
  BlogLatest,
  SolutionLatest,
  SandboxLatest,
} from '@core/data/latest.model';
// import { TranslatePipe } from '@core/i18n/translate.pipe';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SubscribeComponent, FormOrderComponent } from '@shared/components';
import { DevelopmentComponent } from './components/development/development.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DesignsComponent } from './components/designs/designs.component';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    // TranslatePipe,
    HeroComponent,
    AboutComponent,
    SubscribeComponent,
    DevelopmentComponent,
    BlogComponent,
    ProjectsComponent,
    DesignsComponent,
    FormOrderComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  standalone: true,
})
export class HomePage {
  private route = inject(ActivatedRoute);

  data = toSignal(this.route.data, { initialValue: {} as any });
  vm = () =>
    this.data()['home'] as {
      designs: {
        items: DesignsLatest[];
        usedLang: string;
        requestedLang?: string;
        isFallback?: boolean;
      };
      projects: {
        items: ProjectLatest[];
        usedLang: string;
        requestedLang?: string;
        isFallback?: boolean;
      };
      blog: {
        items: BlogLatest[];
        usedLang: string;
        requestedLang?: string;
        isFallback?: boolean;
      };
      solutions: {
        items: SolutionLatest[];
        usedLang: string;
        requestedLang?: string;
        isFallback?: boolean;
      };
      sandbox: {
        items: SandboxLatest[];
        usedLang: string;
        requestedLang?: string;
        isFallback?: boolean;
      };
    };
}
