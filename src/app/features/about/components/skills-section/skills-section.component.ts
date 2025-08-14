import { Component, input } from '@angular/core';
import { SkillsItemComponent } from '../skills-item/skills-item.component';
import { SkillsGroup } from '../../about.model';
import { TranslatePipe } from '@core/i18n/translate.pipe';

@Component({
  selector: 'app-skills-section',
  imports: [SkillsItemComponent, TranslatePipe],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
  standalone: true,
})
export class SkillsSectionComponent {
  skills = input<SkillsGroup[]>();
}
