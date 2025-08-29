import {
  Component,
  Inject,
  WritableSignal,
  signal,
  computed,
  effect,
} from '@angular/core';
import { DEMO_CONFIG, DEMO_THEME } from '@sandbox/shared/utils/tokens';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Theme = 'light' | 'dark';

interface Book {
  id: string;
  title: string;
  author?: string;
  date?: string;
  description?: string;
}

interface BooksConfig {
  showAuthor: boolean;
  showDate: boolean;
  showDescription: boolean;
  __autoGen__?: number;
}

type FormShape = {
  title: string;
  author: string;
  date: string;
  description: string;
};

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage {
  constructor(
    @Inject(DEMO_CONFIG) public config: WritableSignal<BooksConfig>,
    @Inject(DEMO_THEME) public theme: WritableSignal<Theme>
  ) {
    effect(() => {
      const tick = this.autoGen();
      if (!this._mounted || tick == null) return;
      this.addRandomBook();
    });
  }

  readonly autoGen = computed(() => this.config().__autoGen__);

  books = signal<Book[]>([
    {
      id: crypto.randomUUID(),
      title: 'The Angular Way',
      author: 'N. F.',
      date: '2023-05-01',
    },
    {
      id: crypto.randomUUID(),
      title: 'Signals in Practice',
      author: 'A. Dev',
      date: '2024-02-11',
      description: 'A practical guide.',
    },
  ]);

  private _mounted = false;
  ngOnInit() {
    this._mounted = true;
  }

  showModal = signal(false);
  modalMode = signal<'add' | 'edit'>('add');
  editingId = signal<string | null>(null);

  form = signal<{
    title: string;
    author: string;
    date: string;
    description: string;
  }>({
    title: '',
    author: '',
    date: '',
    description: '',
  });

  patchForm(partial: Partial<FormShape>) {
    const curr = this.form();
    this.form.set({ ...curr, ...partial });
  }

  openAddModal() {
    this.modalMode.set('add');
    this.form.set({ title: '', author: '', date: '', description: '' });
    this.showModal.set(true);
  }

  openEditModal(b: Book) {
    this.modalMode.set('edit');
    this.editingId.set(b.id);
    this.form.set({
      title: b.title ?? '',
      author: b.author ?? '',
      date: b.date ?? '',
      description: b.description ?? '',
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingId.set(null);
  }

  saveModal() {
    const f = this.form();
    if (!f.title.trim()) return;

    if (this.modalMode() === 'add') {
      this.books.update((list) => [
        ...list,
        {
          id: crypto.randomUUID(),
          title: f.title.trim(),
          author: f.author.trim() || undefined,
          date: f.date || undefined,
          description: f.description.trim() || undefined,
        },
      ]);
    } else {
      const id = this.editingId();
      if (!id) return;
      this.books.update((list) =>
        list.map((b) =>
          b.id === id
            ? {
                ...b,
                title: f.title.trim(),
                author: f.author.trim() || undefined,
                date: f.date || undefined,
                description: f.description.trim() || undefined,
              }
            : b
        )
      );
    }
    this.closeModal();
  }

  deleteBook(id: string) {
    this.books.update((list) => list.filter((b) => b.id !== id));
  }

  addRandomBook() {
    const titles = [
      'Web Patterns',
      'Clean UI',
      'Async UX',
      'Type-safe Frontend',
      'Design Systems',
    ];
    const authors = ['Alice', 'Bob', 'Charlie', 'Dora', 'Evan'];

    const t = titles[Math.floor(Math.random() * titles.length)];
    const a = authors[Math.floor(Math.random() * authors.length)];
    const y = 2020 + Math.floor(Math.random() * 6);
    const m = 1 + Math.floor(Math.random() * 12);
    const d = 1 + Math.floor(Math.random() * 28);
    const date = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(
      2,
      '0'
    )}`;

    this.books.update((list) => [
      ...list,
      { id: crypto.randomUUID(), title: t, author: a, date },
    ]);
  }
}
