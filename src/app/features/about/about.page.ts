import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { SubscribeComponent, FormOrderComponent } from '@shared/components';
import { WorkComponent } from './components/work-section/work.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { AreaSectionComponent } from './components/area-section/area-section.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AboutVM } from './about.resolver';

@Component({
  selector: 'app-about-page',
  imports: [
    SubscribeComponent,
    FormOrderComponent,
    TranslatePipe,
    WorkComponent,
    SkillsSectionComponent,
    AreaSectionComponent,
  ],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  standalone: true,
})
export class AboutPage {
  private route = inject(ActivatedRoute);
  data = toSignal(this.route.data, { initialValue: {} as any });

  vm = computed(() => this.data()['about'] as AboutVM | undefined);

  areas = computed(() => this.vm()?.areas?.items ?? []);
  skills = computed(() => this.vm()?.skills?.items ?? []);
  work = computed(() => this.vm()?.work?.items ?? []);
}
