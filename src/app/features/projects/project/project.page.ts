import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { SectionItemResult } from '@core/data/section.api';
import { getImagePath } from '@helpers/index';
import { SubscribeComponent, FormOrderComponent } from '@shared/components';
import { ProjectDetail } from '../projects.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-page',
  imports: [SubscribeComponent, FormOrderComponent, CommonModule],
  templateUrl: './project.page.html',
  styleUrl: './project.page.scss',
  standalone: true,
})
export class ProjectPage {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data, { initialValue: {} as any });

  vm = computed(
    () => this.data()['project'] as SectionItemResult<ProjectDetail>
  );

  project = computed(() => this.vm()?.item ?? null);
  isFallback = computed(() => !!this.vm()?.isFallback);
  usedLang = computed(() => this.vm()?.usedLang);
  requestedLang = computed(() => this.vm()?.requestedLang);

  imagePath(name: string | undefined): string {
    return getImagePath(name, this.project()?.slug, 'projects');
  }
}
