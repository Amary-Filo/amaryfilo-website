import {
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLinkWithLangDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  private static readonly MOBILE_BP = 769;

  theme = inject(ThemeService);
  menuOpen = signal(false);
  isDesktop = signal(
    typeof window !== 'undefined'
      ? window.innerWidth >= HeaderComponent.MOBILE_BP
      : true
  );

  iconClass = computed(() => (this.menuOpen() ? 'ic-cancel-1' : 'ic-menu'));
  headerClass = computed(() => (this.menuOpen() ? 'show-menu' : 'n-hdr'));

  toggleMenu() {
    if (!this.isDesktop()) this.menuOpen.update((v) => !v);
  }

  onNavClick() {
    if (!this.isDesktop()) {
      setTimeout(() => this.menuOpen.set(false), 100);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window === 'undefined') return;
    const becameDesktop = window.innerWidth >= HeaderComponent.MOBILE_BP;
    const wasDesktop = this.isDesktop();
    this.isDesktop.set(becameDesktop);

    if (becameDesktop && !wasDesktop) this.menuOpen.set(false);
  }
}
