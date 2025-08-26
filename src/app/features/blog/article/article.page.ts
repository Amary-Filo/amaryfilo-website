import {
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  BlogArticleDetail,
  BlogArticleMenu,
  ContentBlock,
} from '../blog.model';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { ArticleBlockComponent } from './components/article-block/article-block.component';

@Component({
  selector: 'app-article-page',
  imports: [CommonModule, TranslatePipe, ArticleBlockComponent],
  templateUrl: './article.page.html',
  styleUrl: './article.page.scss',
  standalone: true,
})
export class ArticlePage {
  private static readonly MOBILE_BP = 1025;
  private static readonly STICKY_OFFSET = 120; // подгони под высоту шапки

  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data, { initialValue: {} as any });

  activeId = signal<string>('');
  showTopButton = signal(false);

  menuOpen = signal(false);
  isDesktop = signal(
    typeof window !== 'undefined'
      ? window.innerWidth >= ArticlePage.MOBILE_BP
      : true
  );

  iconClass = computed(() => (this.menuOpen() ? 'ic-cancel-1' : 'ic-menu'));

  article = computed<BlogArticleDetail | null>(() => {
    const r = this.data()['article'];
    return r?.item ?? r ?? null;
  });

  menuGrouped = computed(() => {
    const menu = (this.article()?.menu ?? []) as BlogArticleMenu[];
    const groups: Array<{ h2: BlogArticleMenu; subs: BlogArticleMenu[] }> = [];
    let current: { h2: BlogArticleMenu; subs: BlogArticleMenu[] } | null = null;

    for (const m of menu) {
      if (m.level === 2) {
        current = { h2: m, subs: [] };
        groups.push(current);
      } else if (m.level === 3) {
        if (!current) {
          current = {
            h2: { id: 'section', title: 'Section', level: 2 },
            subs: [],
          };
          groups.push(current);
        }
        current.subs.push(m);
      }
    }

    return groups;
  });

  content = computed<ContentBlock[]>(() => this.article()?.content ?? []);

  @HostListener('window:resize')
  onResize() {
    if (typeof window === 'undefined') return;
    const becameDesktop = window.innerWidth >= ArticlePage.MOBILE_BP;
    const wasDesktop = this.isDesktop();
    this.isDesktop.set(becameDesktop);

    if (becameDesktop && !wasDesktop) this.menuOpen.set(false);
  }

  toggleMenu() {
    if (!this.isDesktop()) this.menuOpen.update((v) => !v);
  }

  goTo(id: string, ev: Event) {
    ev.preventDefault();
    this.activeId.set(id);
    const el = document.getElementById(id);
    if (!el) return;

    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      ArticlePage.STICKY_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });

    if (!this.isDesktop()) this.menuOpen.set(false);

    // history.replaceState(null, '', `#${id}`);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (typeof window === 'undefined') return;
    this.showTopButton.set(window.scrollY > 300);
  }

  scrollTop() {
    this.activeId.set('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
