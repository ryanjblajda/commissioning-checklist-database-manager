import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Member } from '../../models/member/member.model';

@Component({
  selector: 'app-device-pane',
  imports: [FormsModule],
  templateUrl: './device-pane.html',
  styleUrl: './device-pane.scss',
})

export class DevicePane {
  capabilities = input.required<Member[]>();
  controls = input.required<Member[]>();
  submitButtonText = input.required<string>();

  submitSuggestion() {
    console.log('submitted');
  }
}