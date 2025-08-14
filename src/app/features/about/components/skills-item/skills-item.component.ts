import { Component, input } from '@angular/core';
import { SkillsGroup } from '../../about.model';

@Component({
  selector: 'app-skills-item',
  imports: [],
  templateUrl: './skills-item.component.html',
  styleUrl: './skills-item.component.scss',
  standalone: true,
})
export class SkillsItemComponent {
  skills = input<SkillsGroup>();
}
