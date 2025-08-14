import { Component } from '@angular/core';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { SubscribeComponent, FormOrderComponent } from '@shared/components';
import { SkillsComponent } from './components/skills/skills.component';
import { WorkComponent } from './components/work/work.component';

export interface SkillsItem {
  icon: string;
  title: string;
  description: string;
  skills: {
    icon: string;
    title: string;
  }[];
}

@Component({
  selector: 'app-about-page',
  imports: [
    SubscribeComponent,
    FormOrderComponent,
    TranslatePipe,
    SkillsComponent,
    WorkComponent,
  ],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
  standalone: true,
})
export class AboutPage {
  skills: SkillsItem[] = [
    {
      icon: 'gallery',
      title: 'Frontend',
      description:
        'Frontend spec. and frameworks for create web/mobile applications.',
      skills: [
        {
          title: 'Angular',
          icon: 'angular',
        },
        {
          title: 'React',
          icon: 'react',
        },
        { title: 'Vue', icon: 'vue' },
        {
          title: 'Ionic',
          icon: 'ionic',
        },
        {
          title: 'HTML',
          icon: 'html5',
        },
        {
          title: 'Css',
          icon: 'css3',
        },
        {
          title: 'Sass',
          icon: 'sass',
        },
        {
          title: 'Pug',
          icon: 'pug',
        },
        {
          title: 'RxJs',
          icon: 'rxjs',
        },
        {
          title: 'NgRx',
          icon: 'rxjs',
        },
        {
          title: 'Gulp',
          icon: 'gulp',
        },
      ],
    },
    {
      icon: 'feature',
      title: 'Blockchain',
      description: 'Packages and technologies used in applications.',
      skills: [
        {
          title: 'Web3Js',
          icon: 'web3js',
        },
        {
          title: 'Amfi Connect',
          icon: 'amaryfilo',
        },
        {
          title: 'Wallet Connect',
          icon: 'walletconnect',
        },
        {
          title: 'Metamask',
          icon: 'metamask',
        },
        {
          title: 'Wallets',
          icon: 'wallet',
        },
        {
          title: 'Staking',
          icon: 'coins',
        },
        {
          title: 'Bridges',
          icon: 'bitcoin',
        },
      ],
    },
    {
      icon: 'images',
      title: 'Backend',
      description:
        'Technologies for create server-side (backend) api. CMS for websites. Databases and server optimization.',
      skills: [
        {
          title: 'NodeJs',
          icon: 'nodejs',
        },
        {
          title: 'API',
          icon: 'api',
        },
        {
          title: 'REST',
          icon: 'rest',
        },
        {
          title: 'GraphQL',
          icon: 'graphql',
        },
        {
          title: 'PHP',
          icon: 'php',
        },
        {
          title: 'Laravel',
          icon: 'laravel',
        },
        {
          title: 'Postgress',
          icon: 'postgres',
        },
        {
          title: 'MySql',
          icon: 'mysql',
        },
        {
          title: 'MongoDb',
          icon: 'mongodb',
        },
        {
          title: 'Apache',
          icon: 'apache',
        },
        {
          title: 'Nginx',
          icon: 'nginx',
        },
        {
          title: 'Winter CMS',
          icon: 'wintercms',
        },
        {
          title: 'October CMS',
          icon: 'octobercms',
        },
        {
          title: 'Custom CMS',
          icon: 'customcms',
        },
      ],
    },
    {
      icon: 'done',
      title: 'Other',
      description: 'CI/CD, programms and additional information.',
      skills: [
        {
          title: 'GitHub',
          icon: 'github',
        },
        {
          title: 'Git',
          icon: 'git',
        },
        {
          title: 'Bitbucket',
          icon: 'bitbucket',
        },
        {
          title: 'Git Flow',
          icon: 'gitflow',
        },
        {
          title: 'Npmjs',
          icon: 'npm',
        },
        {
          title: 'GH Action',
          icon: 'github',
        },
      ],
    },
  ];
}
