import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Lang, LANG_NAMES } from '@core/i18n/i18n.model';
import { TranslatePipe } from "../../core/i18n/translate.pipe";

@Component({
  selector: 'app-designs-page',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './designs.page.html',
  styleUrl: './designs.page.scss',
  standalone: true
})
export class DesignsPage {
  private route = inject(ActivatedRoute);
  data = toSignal(this.route.data, { initialValue: {} as any });

  // удобные геттеры для шаблона:
  vm = () => this.data()['index'] as { items:any[]; usedLang:string; requestedLang?:string; isFallback:boolean };

  langName = (lang: Lang | undefined) => LANG_NAMES[lang || 'en']
}
