import {
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Lang,
  LANG_NAMES,
  LANG_SHORT,
  SUPPORTED_LANGS,
} from '@core/i18n/i18n.model';
import { LanguageService } from '@core/i18n/language.service';
import { TranslatePipe } from '@core/i18n/translate.pipe';
import { RouterLinkWithLangDirective } from '@core/i18n/with-lang-link.directive';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLinkWithLangDirective, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  private static readonly MOBILE_BP = 769;

  theme = inject(ThemeService);
  langSvc = inject(LanguageService);

  menuOpen = signal(false);
  isDesktop = signal(
    typeof window !== 'undefined'
      ? window.innerWidth >= HeaderComponent.MOBILE_BP
      : true
  );

  langNames = LANG_NAMES;
  langModalOpen = signal(false);
  langs = SUPPORTED_LANGS;
  currentLangName = computed(() => LANG_SHORT[this.langSvc.current]);

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

  openLangModal() {
    this.langModalOpen.set(true);
  }

  closeLangModal() {
    this.langModalOpen.set(false);
    this.toggleMenu();
  }

  async pickLang(lang: Lang) {
    if (lang === this.langSvc.current) {
      this.closeLangModal();
      return;
    }

    await this.langSvc.switch(lang);
    this.closeLangModal();
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
