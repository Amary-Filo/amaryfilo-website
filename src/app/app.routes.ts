import { CanMatchFn, Routes } from '@angular/router';
import { langMatcher } from '@core/i18n/lang.matcher';
import { designsIndexResolver } from './features/designs/designs.resolver';
import { designResolver } from './features/designs/design/design.resolver';
import { homeLatestResolver } from './features/home/home.resolver';
import { aboutResolver } from './features/about/about.resolver';
import { ExistsGuard } from '@core/guards/exists.guard';
import { projectsIndexResolver } from './features/projects/projects.resolver';
import { projectResolver } from './features/projects/project/project.resolver';
import { blogIndexResolver } from './features/blog/blog.resolver';
import { articleResolver } from './features/blog/article/article.resolver';

const SUP_LANGS = ['en', 'ru', 'es', 'de'] as const;

export const langCanMatch: CanMatchFn = (_route, segments) => {
  const first = segments[0]?.path;
  return !!first && (SUP_LANGS as readonly string[]).includes(first);
};

const children: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.page').then((m) => m.HomePage),
    resolve: { home: homeLatestResolver },
    title: 'Amary Filo | Software Developer',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.page').then((m) => m.AboutPage),
    resolve: { about: aboutResolver },
    title: 'Amary Filo | About Me',
  },
  {
    path: 'designs',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/designs/designs.page').then((m) => m.DesignsPage),
        resolve: { index: designsIndexResolver },
        title: 'Amary Filo | Designs',
      },
      {
        path: ':slug',
        canActivate: [ExistsGuard],
        data: { page: 'designs' },
        loadComponent: () =>
          import('./features/designs/design/design.page').then(
            (m) => m.DesignPage
          ),
        resolve: { design: designResolver },
      },
    ],
  },
  {
    path: 'projects',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/projects/projects.page').then(
            (m) => m.ProjectsPage
          ),
        resolve: { index: projectsIndexResolver },
        title: 'Amary Filo | Projects',
      },
      {
        path: ':slug',
        canActivate: [ExistsGuard],
        data: { page: 'projects' },
        loadComponent: () =>
          import('./features/projects/project/project.page').then(
            (m) => m.ProjectPage
          ),
        resolve: { project: projectResolver },
      },
    ],
  },
  {
    path: 'blog',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/blog/blog.page').then((m) => m.BlogPage),
        resolve: { index: blogIndexResolver },
        title: 'Amary Filo | Blog',
      },
      {
        path: ':slug',
        canActivate: [ExistsGuard],
        loadComponent: () =>
          import('./features/blog/article/article.page').then(
            (m) => m.ArticlePage
          ),
        resolve: { article: articleResolver },
      },
    ],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./features/not-found/not-found.page').then((m) => m.NotFoundPage),
    title: 'Oops... Not found',
  },
];

export const routes: Routes = [
  { matcher: langMatcher, children },
  { path: ':lang', canMatch: [langCanMatch], children },
  { path: '', children },
  { path: '**', redirectTo: '' },
];
