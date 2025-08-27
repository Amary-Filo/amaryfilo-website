import { Component, inject, input, PLATFORM_ID } from '@angular/core';
import {
  CodeBlock,
  ContentBlock,
  DlBlock,
  EmbedCodepenBlock,
  H2Block,
  H3Block,
  ImageBlock,
  NoteBlock,
  OlBlock,
  PBlock,
  QuoteBlock,
  UlBlock,
} from 'app/features/blog/blog.model';
import { CodepenScriptService } from '../../codepen-script.service';
import { SafeHtmlPipe } from '@shared/pipes';
import { getImagePath } from '@helpers/index';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-article-block',
  imports: [SafeHtmlPipe],
  templateUrl: './article-block.component.html',
  styleUrl: './article-block.component.scss',
  standalone: true,
})
export class ArticleBlockComponent {
  readonly block = input.required<ContentBlock>();
  readonly slug = input.required<string>();

  private codepen = inject(CodepenScriptService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isP(x: ContentBlock): x is PBlock {
    return x.type === 'p';
  }
  isH2(x: ContentBlock): x is H2Block {
    return x.type === 'h2';
  }
  isH3(x: ContentBlock): x is H3Block {
    return x.type === 'h3';
  }
  isImage(x: ContentBlock): x is ImageBlock {
    return x.type === 'image';
  }
  isCode(x: ContentBlock): x is CodeBlock {
    return x.type === 'code';
  }
  isNote(x: ContentBlock): x is NoteBlock {
    return x.type === 'note';
  }
  isUl(x: ContentBlock): x is UlBlock {
    return x.type === 'ul';
  }
  isOl(x: ContentBlock): x is OlBlock {
    return x.type === 'ol';
  }
  isDl(x: ContentBlock): x is DlBlock {
    return x.type === 'dl';
  }
  isQuote(x: ContentBlock): x is QuoteBlock {
    return x.type === 'quote';
  }
  isEmbedCodepen(x: ContentBlock): x is EmbedCodepenBlock {
    return x.type === 'embed' && x.provider === 'codepen';
  }

  ngAfterViewInit(): void {
    const v = this.block();
    if (this.isBrowser && v?.type === 'embed' && v.provider === 'codepen') {
      this.codepen.ensureLoaded();
    }
  }

  imagePath(name: string | undefined): string {
    return getImagePath(name, this.slug(), 'blog');
  }
}
