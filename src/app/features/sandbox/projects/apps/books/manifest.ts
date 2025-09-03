import { Manifest, BaseDemoConfig } from '@sandbox/shared/utils/tokens';
import { BooksPage } from './page/books.page';
import { BooksControlsComponent } from './controls/controls.component';

export interface BooksConfig extends BaseDemoConfig {
  showAuthor: boolean;
  showDate: boolean;
  showDescription: boolean;
}

export const APP_BOOKS_MANIFEST: Manifest<BooksConfig> = {
  id: 'app-books',
  slug: 'app-books',
  kind: 'app',
  title: 'Books Library',
  description: 'Simple books grid with add/edit modal and configurable fields.',
  tags: ['app', 'demo'],
  component: BooksPage,
  controls: BooksControlsComponent,
  defaultConfig: {
    showAuthor: true,
    showDate: true,
    showDescription: false,
  },
};
