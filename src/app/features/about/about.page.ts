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

  // skills: SkillsGroup[] = [
  //   {
  //     id: 1,
  //     icon: 'gallery',
  //     title: 'Frontend',
  //     description:
  //       'Frontend spec. and frameworks for create web/mobile applications.',
  //     skills: [
  //       { id: 1, title: 'Angular', icon: 'angular' },
  //       { id: 2, title: 'React', icon: 'react' },
  //       { id: 3, title: 'Vue', icon: 'vue' },
  //       { id: 4, title: 'Ionic', icon: 'ionic' },
  //       { id: 5, title: 'HTML', icon: 'html5' },
  //       { id: 6, title: 'Css', icon: 'css3' },
  //       { id: 7, title: 'Sass', icon: 'sass' },
  //       { id: 8, title: 'Pug', icon: 'pug' },
  //       { id: 9, title: 'RxJs', icon: 'rxjs' },
  //       { id: 10, title: 'NgRx', icon: 'rxjs' },
  //       { id: 11, title: 'Gulp', icon: 'gulp' },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     icon: 'feature',
  //     title: 'Blockchain',
  //     description: 'Packages and technologies used in applications.',
  //     skills: [
  //       { id: 1, title: 'Web3Js', icon: 'web3js' },
  //       { id: 2, title: 'Amfi Connect', icon: 'amaryfilo' },
  //       { id: 3, title: 'Wallet Connect', icon: 'walletconnect' },
  //       { id: 4, title: 'Metamask', icon: 'metamask' },
  //       { id: 5, title: 'Wallets', icon: 'wallet' },
  //       { id: 6, title: 'Staking', icon: 'coins' },
  //       { id: 7, title: 'Bridges', icon: 'bitcoin' },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     icon: 'images',
  //     title: 'Backend',
  //     description:
  //       'Technologies for create server-side (backend) api. CMS for websites. Databases and server optimization.',
  //     skills: [
  //       { id: 1, title: 'NodeJs', icon: 'nodejs' },
  //       { id: 2, title: 'API', icon: 'api' },
  //       { id: 3, title: 'REST', icon: 'rest' },
  //       { id: 4, title: 'GraphQL', icon: 'graphql' },
  //       { id: 5, title: 'PHP', icon: 'php' },
  //       { id: 6, title: 'Laravel', icon: 'laravel' },
  //       { id: 7, title: 'Postgres', icon: 'postgres' },
  //       { id: 8, title: 'MySql', icon: 'mysql' },
  //       { id: 9, title: 'MongoDb', icon: 'mongodb' },
  //       { id: 10, title: 'Apache', icon: 'apache' },
  //       { id: 11, title: 'Nginx', icon: 'nginx' },
  //       { id: 12, title: 'Winter CMS', icon: 'wintercms' },
  //       { id: 13, title: 'October CMS', icon: 'octobercms' },
  //       { id: 14, title: 'Custom CMS', icon: 'customcms' },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     icon: 'done',
  //     title: 'Other',
  //     description: 'CI/CD, programms and additional information.',
  //     skills: [
  //       { id: 1, title: 'GitHub', icon: 'github' },
  //       { id: 2, title: 'Git', icon: 'git' },
  //       { id: 3, title: 'Bitbucket', icon: 'bitbucket' },
  //       { id: 4, title: 'Git Flow', icon: 'gitflow' },
  //       { id: 5, title: 'Npmjs', icon: 'npm' },
  //       { id: 6, title: 'GH Action', icon: 'github' },
  //     ],
  //   },
  // ];

  // work: WorkGroup[] = [
  //   {
  //     id: 1,
  //     title: 'Start career',
  //     positions: ['Junior Web Developer'],
  //     date_start: '01.09.2014',
  //     date_end: '31.09.2016',
  //     areas: [
  //       'Create first landing pages with my build-on-develop design.',
  //       'Learn Web JavaScript for manipulating elememts and etc.',
  //       'Learn basic PHP for send Forms and another data by mail.',
  //       'Learning HTML and CSS as basic things for create website pages.',
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Grand Media Service',
  //     positions: ['Web Developer', 'Middle Web Developer'],
  //     date_start: '16.09.2016',
  //     date_end: '31.08.2019',
  //     areas: [
  //       'Create first landing pages with my build-on-develop design.',
  //       'Learn Web JavaScript for manipulating elememts and etc.',
  //       'Learn basic PHP for send Forms and another data by mail.',
  //       'Learning HTML and CSS as basic things for create website pages.',
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: 'Wallarm',
  //     positions: ['Middle Web Developer'],
  //     date_start: '01.02.2019',
  //     date_end: '31.08.2019',
  //     areas: [
  //       'Create first landing pages with my build-on-develop design.',
  //       'Learn Web JavaScript for manipulating elememts and etc.',
  //       'Learn basic PHP for send Forms and another data by mail.',
  //       'Learning HTML and CSS as basic things for create website pages.',
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "Rock'n'Block",
  //     positions: ['Front-end TeamLead', 'Software Engeneer'],
  //     date_start: '11.11.2019',
  //     date_end: '31.01.2022',
  //     areas: [
  //       'Create first landing pages with my build-on-develop design.',
  //       'Learn Web JavaScript for manipulating elememts and etc.',
  //       'Learn basic PHP for send Forms and another data by mail.',
  //       'Learning HTML and CSS as basic things for create website pages.',
  //     ],
  //   },
  //   {
  //     id: 5,
  //     title: 'Nodamatics',
  //     positions: ['Senior Front-end TeamLead'],
  //     date_start: '15.02.2022',
  //     date_end: '31.05.2022',
  //     areas: [
  //       'Create first landing pages with my build-on-develop design.',
  //       'Learn Web JavaScript for manipulating elememts and etc.',
  //       'Learn basic PHP for send Forms and another data by mail.',
  //       'Learning HTML and CSS as basic things for create website pages.',
  //     ],
  //   },
  //   {
  //     id: 6,
  //     title: 'Unlimit',
  //     positions: [
  //       'Front-end Blockchain Senior Engineer',
  //       'Front-end TeamLead',
  //       'Senior Front-end Developer',
  //     ],
  //     date_start: '29.08.2022',
  //     date_end: '31.08.2025',
  //     areas: [
  //       'Create first landing pages with my build-on-develop design.',
  //       'Learn Web JavaScript for manipulating elememts and etc.',
  //       'Learn basic PHP for send Forms and another data by mail.',
  //       'Learning HTML and CSS as basic things for create website pages.',
  //     ],
  //   },
  //   {
  //     id: 7,
  //     title: 'Open To Work',
  //     positions: [
  //       'Front-end Blockchain Senior Engineer',
  //       'Front-end TeamLead',
  //       'Senior Front-end Developer',
  //     ],
  //     date_start: '31.08.2025',
  //     date_end: '31.12.2099',
  //     areas: [],
  //   },
  // ];

  // areas: AreaGroup[] = [
  //   {
  //     id: 1,
  //     icon: 'frontend',
  //     title: 'Frontend',
  //     skills: ['Angular'],
  //   },
  //   {
  //     id: 2,
  //     icon: 'blockchain',
  //     title: 'Blockchain',
  //     skills: ['DeFi', 'Wallets'],
  //   },
  //   {
  //     id: 3,
  //     icon: 'backend',
  //     title: 'Backend',
  //     skills: ['NodeJs', 'Databases'],
  //   },
  //   {
  //     id: 4,
  //     icon: 'design',
  //     title: 'Design (UI/UX)',
  //     skills: ['Web', 'Mobile'],
  //   },
  // ];
}
