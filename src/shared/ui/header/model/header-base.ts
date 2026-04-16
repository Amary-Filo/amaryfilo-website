// src/shared/ui/header/model/header-base.ts

import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  inject,
  signal,
  computed,
} from '@angular/core';

import { ScrollService } from '@shared/lib/scroll.service';
import { IconName } from '@shared/ui/kit/icon/types';

@Directive()
export abstract class HeaderBase implements OnInit {
  // protected readonly dialogManager = inject(NgpDialogManager);
  protected readonly host = inject(ElementRef<HTMLElement>);
  protected readonly scroll = inject(ScrollService);

  protected static readonly MOBILE_BP = 769;

  readonly menuOpen = signal(false);
  readonly isDesktop = signal(
    typeof window !== 'undefined' ? window.innerWidth >= HeaderBase.MOBILE_BP : true,
  );
  readonly icon = computed<IconName>(() => (this.menuOpen() ? 'closeLine' : 'menuFill'));

  ngOnInit(): void {
    this.updateHeaderOffset();
  }

  toggleMenu(): void {
    if (!this.isDesktop()) this.menuOpen.update((value) => !value);
  }

  // openDialog(): void {
  //   this.dialogManager.open(ContactDialog);
  // }

  protected closeMenuOnMobile(): void {
    if (!this.isDesktop()) this.menuOpen.set(false);
  }

  protected updateHeaderOffset(): void {
    if (typeof window === 'undefined') return;
    const rect = this.host.nativeElement.getBoundingClientRect();
    this.scroll.setHeaderOffset(rect.height);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window === 'undefined') return;

    const becameDesktop = window.innerWidth >= HeaderBase.MOBILE_BP;
    const wasDesktop = this.isDesktop();

    this.isDesktop.set(becameDesktop);

    if (becameDesktop && !wasDesktop) this.menuOpen.set(false);

    this.updateHeaderOffset();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isDesktop() || !this.menuOpen()) return;

    const target = event.target as HTMLElement | null;
    if (!target) return;

    const clickedInside = this.host.nativeElement.contains(target);
    if (!clickedInside) this.menuOpen.set(false);
  }
}
