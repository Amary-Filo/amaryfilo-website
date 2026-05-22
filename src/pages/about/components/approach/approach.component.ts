// src/pages/about/components/approach/approach.component.ts

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'section-approach',
  standalone: true,
  templateUrl: './approach.component.html',
  styleUrl: './approach.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproachSection {
  readonly list: { title: string; text: string }[] = [
    {
      title: 'Practical Tech Decisions',
      text: 'I evaluate technical choices based on cost, time, and stability, aligning engineering efforts with business goals to keep development efficient and maintenance predictable.',
    },
    {
      title: 'Tool-Assisted Engineering Workflow',
      text: 'I use modern engineering tools, including AI-assisted workflows, to speed up exploration and routine tasks while keeping full ownership of architecture, implementation quality, and final technical decisions.',
    },
    {
      title: 'Balancing Speed and Quality',
      text: 'Speed and quality are not always opposites. I prioritize shipping first versions quickly to validate business needs, while keeping the core architecture stable and ready for future growth.',
    },
    {
      title: 'Built for the Team',
      text: 'A system is only good if others can work with it. I value clear, straightforward code over unnecessary complexity, making sure any new engineer can jump in, understand it, and easily maintain the project.',
    },
  ];
}
