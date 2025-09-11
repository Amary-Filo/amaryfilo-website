import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrameService } from '@sandbox/shared/frame/frame.service';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  layout = inject(FrameService);
}
