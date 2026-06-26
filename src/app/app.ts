import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Database Manager');
  private apiServer = inject(ApiService)

  constructor(private documentTitle:Title) { 
    this.documentTitle.setTitle(this.title())
  }
}
