import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-result-message',
  imports: [],
  templateUrl: './result-message.html',
  styleUrl: './result-message.scss',
})

export class ResultMessage {
  close = output<null>();
  title = input.required<string>();
  message = input.required<string>();

  onClose() { this.close.emit(null); }
}
