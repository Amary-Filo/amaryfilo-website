import { Component, input } from '@angular/core';
import { SkillsItem } from '../../about.page';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  standalone: true,
})
export class SkillsComponent {
  skills = input<SkillsItem>();
}
