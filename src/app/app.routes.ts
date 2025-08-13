import { Routes } from '@angular/router';
import { langMatcher } from '@core/i18n/lang.matcher';
import { designsIndexResolver } from './features/designs/designs.resolver';
import { designResolver } from './features/designs/design/design.resolver';
import { homeLatestResolver } from './features/home/home.resolver';

const children: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.page').then((m) => m.HomePage),
    resolve: { home: homeLatestResolver },
    title: 'Amary Filo',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.page').then((m) => m.AboutPage),
    title: 'About',
  },
  {
    path: 'areas',
    loadComponent: () =>
      import('./features/areas/areas.page').then((m) => m.AreasPage),
    title: 'Areas',
  },
  // { path: 'areas/:slug', loadComponent: () => import('./features/areas/area.page').then(m => m.AreaPage) },

  {
    path: 'designs',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/designs/designs.page').then((m) => m.DesignsPage),
        resolve: { index: designsIndexResolver },
        title: 'Designs',
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./features/designs/design/design.page').then(
            (m) => m.DesignPage
          ),
        resolve: { index: designResolver },
      },
    ],
  },

  // {
  //   path: 'blog',
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () => import('./features/blog/blog.page').then(m => m.BlogPage),
  //       resolve: { index: () => import('./features/blog/blog.resolver').then(m => m.blogIndexResolver) },
  //       title: 'Blog'
  //     },
  //     {
  //       path: ':slug',
  //       loadComponent: () => import('./features/blog/article/article.page').then(m => m.ArticlePage),
  //       resolve: { post: () => import('./features/blog/post.resolver').then(m => m.postResolver) }
  //     }
  //   ]
  // },

  // {
  //   path: 'projects',
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () => import('./features/projects/projects.page').then(m => m.ProjectsPage),
  //       resolve: { index: () => import('./features/projects/projects.resolver').then(m => m.projectsIndexResolver) },
  //       title: 'Projects'
  //     },
  //     {
  //       path: ':slug',
  //       loadComponent: () => import('./features/projects/project.page').then(m => m.ProjectPage),
  //       resolve: { project: () => import('./features/projects/project.resolver').then(m => m.projectResolver) }
  //     },
  //     {
  //       path: ':slug/:article',
  //       loadComponent: () => import('./features/projects/project-article.page').then(m => m.ProjectArticlePage),
  //       resolve: { article: () => import('./features/projects/project-article.resolver').then(m => m.projectArticleResolver) }
  //     }
  //   ]
  // },

  // { path: 'solutions', loadComponent: () => import('./features/solutions/solutions.page').then(m => m.SolutionsPage), title: 'Solutions' },
  // { path: 'sandbox', loadComponent: () => import('./features/sandbox/sandbox.page').then(m => m.SandboxPage), title: 'Sandbox' },

  // { path: 'contact', loadComponent: () => import('./features/contact/contact.page').then(m => m.ContactPage), title: 'Contact' },

  // { path: '404', loadComponent: () => import('./features/not-found/not-found.page').then(m => m.NotFoundPage), title: 'Not found' },
  // { path: '**', redirectTo: '404' }
];

export const routes: Routes = [
  { matcher: langMatcher, children },
  { path: '', children },
  { path: '**', redirectTo: '' },
];
