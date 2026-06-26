import { Component, signal, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '../widgets/navigation/navigation';
import { Member } from '../models/member/member.model';
import { ControlType } from '../models/control-type/control-type.model';
import { ApiService } from '../services/api/api.service';
import { DevicePane } from "../widgets/device-pane/device-pane";

@Component({
  selector: 'app-suggestion-page',
  imports: [Navigation, CommonModule, DevicePane],
  templateUrl: './suggestion-page.html',
  styleUrl: './suggestion-page.scss',
})

export class SuggestionPage {
  private apiService = inject(ApiService);

  capabilities = signal<Member[]>([])

  controls = signal<Member[]>([])

  btnText = "Suggest Device";

  constructor() { 
    this.getCapabilities();
    this.getControlTypes();
  } 

  getCapabilities() {
    this.apiService.getCapabilities().subscribe(
      payload => {
        this.capabilities.set(payload.payload);
    });
  }

  getControlTypes() {
    this.apiService.getControlTypes().subscribe(
      payload => {
        this.controls.set(payload.payload);
    });
  }
}