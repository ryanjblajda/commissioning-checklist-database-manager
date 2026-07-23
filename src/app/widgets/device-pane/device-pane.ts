import { Component, input, signal, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DescriptiveMember, Member } from '../../models/member/member.model';
import { SearchableComboBox } from "../combobox/combobox";
import { ApiService } from '../../services/api/api.service';
import { NewDevicePayload } from '../../models/device/device.model';
import { ItemList } from "../item-list/item-list";

@Component({
  selector: 'app-device-pane',
  imports: [FormsModule, SearchableComboBox, ItemList],
  templateUrl: './device-pane.html',
  styleUrl: './device-pane.scss',
})

export class DevicePane {
  private apiService = inject(ApiService);

  prefixes = input.required<DescriptiveMember[]>();
  prefixSelected = signal<string>("");

  manufacturers = input.required<DescriptiveMember[]>();
  manufacturerSelected = signal<string>("");

  modelSelected = signal<string>("");
  
  capabilities = input.required<Member[]>();

  controls = input.required<Member[]>();

  submitButtonText = input.required<string>();

  submitButtonDisabled = signal<boolean>(true);

  device = output<NewDevicePayload>();

  prefix:string = "prefix";
  manufacturer:string = "manufacturer";
  model:string = "model";
  capabilityListTitle = "Device Capabilities";
  controlListTitle = "Control Types"

  selectManufacturer(mfr:string) {
    this.manufacturerSelected.set(mfr);
    //console.log(this.manufacturerSelected());
    this.enableSubmitButton();
  }

  selectPrefix(prefix:string) {
    this.prefixSelected.set(prefix);
    //console.log(this.prefixSelected());
    this.enableSubmitButton();
  }

  selectModel(model:string) {
    this.modelSelected.set(model.toUpperCase())
    //console.log(this.modelSelected());
    this.enableSubmitButton();
  }

  enableSubmitButton() {
    this.submitButtonDisabled.set(!(this.manufacturerSelected() !== "" && this.prefixSelected() !== "" && this.modelSelected() !== ""))
  }

  displayDeviceDetails() {
    console.log(`create new device: `);

    console.log(`${this.prefixSelected()} : ${this.modelSelected()} made by ${this.manufacturerSelected()}`)
  }

  submitSuggestion() {
    this.displayDeviceDetails();
    
    let controls:number[] = [];
    let capabilities:number[] = [];

    let prefixID = this.prefixes().find(member => member.name == this.prefixSelected())?.id || 0;
    let manufacturerID = this.manufacturers().find(member => member.name == this.manufacturerSelected())?.id || 0;
    let model = this.modelSelected();

    this.device.emit(new NewDevicePayload(prefixID, manufacturerID, model, capabilities, controls));

    this.modelSelected.set("");
    this.prefixSelected.set("");
    this.manufacturerSelected.set("");
  }
}