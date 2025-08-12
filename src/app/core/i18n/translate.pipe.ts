import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({ name: 't', standalone: true, pure: true })
export class TranslatePipe implements PipeTransform {
  constructor(private tService: TranslateService) {}
  transform(key: string, params?: Record<string, any>): string {
    return this.tService.t(key, params);
  }
}