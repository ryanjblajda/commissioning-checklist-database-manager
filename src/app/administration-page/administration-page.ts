import { Component, signal, inject } from '@angular/core';
import { Navigation } from '../widgets/navigation/navigation';
import { DescriptiveMember, Member } from '../models/member/member.model';
import { ApiService } from '../services/api/api.service';
import { DevicePane } from "../widgets/device-pane/device-pane";
import { Device, NewDevicePayload } from '../models/device/device.model';
import { NgClass } from '@angular/common';
import { SearchableComboBox } from '../widgets/combobox/combobox';
import { ResultMessage } from "../widgets/result-message/result-message";
import { startCase } from 'lodash';
import { ItemList } from '../widgets/item-list/item-list';

@Component({
  selector: 'app-administration-page',
  imports: [Navigation, DevicePane, NgClass, SearchableComboBox, ResultMessage, ItemList],
  templateUrl: './administration-page.html',
  styleUrl: './administration-page.scss',
})
export class AdministrationPage {
  private apiService = inject(ApiService);

  capabilities = signal<Member[]>([])
  controls = signal<Member[]>([])
  types = signal<DescriptiveMember[]>([])
  manufacturers = signal<DescriptiveMember[]>([])
  models = signal<Device[]>([])
  tasks = signal<DescriptiveMember[]>([])

  showMessage = signal<boolean>(false);
  messageTitle = signal<string>("");
  messageBody = signal<string>("");

  addButtonDisabled = signal<boolean>(true);

  nameText = signal<string>("");
  descriptionText = signal<string>("");
  manufacturerID = signal<number>(0);

  btnText = "Add Device";
  tabDashboard = 'Dashboard';
  tabTypes = 'Type';
  tabModels = 'Model';
  tabManufacturers = 'Manufacturer';
  tabCapabilities = 'Capability';
  tabControlTypes = 'Control Type';
  tabTasks = 'Task';
  tabSearch = 'Search'

  tabs = [
    this.tabDashboard, this.tabDashboard, this.tabModels, 
    this.tabManufacturers, this.tabCapabilities, this.tabControlTypes, this.tabTasks
  ]

  selectedTab = signal<string>(this.tabs[0]);

  constructor() { 
    this.refreshDatabase();
  } 

  supportsDescription(tab:string): boolean {
    let result = false;
    switch(tab) 
    {
      case this.tabCapabilities: break;
      case this.tabControlTypes: break;
      case this.tabManufacturers: break;
      case this.tabModels: break;
      case this.tabSearch: break;
      case this.tabTasks: result = false; break;
      case this.tabTypes: result = true; break;
    }

    return result;
  }

  getDescriptionTextTransform(tab:string): string {
    let result = '';
    switch(tab) 
    {
      case this.tabCapabilities: break;
      case this.tabControlTypes: break;
      case this.tabManufacturers: break;
      case this.tabModels: break;
      case this.tabSearch: break;
      case this.tabTasks: break;
      case this.tabTypes: result = 'capitalize'; break;
    }
    return result;
  }

  getNameTextTransform(tab:string): string {
    let result = '';
    switch(tab) 
    {
      case this.tabCapabilities: result = 'lowercase'; break;
      case this.tabControlTypes: result = 'lowercase'; break;
      case this.tabManufacturers: result = 'uppercase'; break;
      case this.tabModels: result = 'uppercase'; break;
      case this.tabSearch: break;
      case this.tabTasks: result = 'capitalize'; break;
      case this.tabTypes: result = 'uppercase'; break;
    }
    return result;
  }

  supportsAddEntry(tab:string): boolean {
    let result = false;
    switch(tab) 
    {
      case this.tabCapabilities: result = true; break;
      case this.tabControlTypes: result = true; break;
      case this.tabManufacturers: result = true;  break;
      case this.tabModels: result = true; break;
      case this.tabSearch: break;
      case this.tabTasks: result = true; break;
      case this.tabTypes: result = true; break;
    }

    return result;
  }

  searchItem(searchType:string, searchString:string): void {
    this.setSelectedTab(this.tabSearch);
  }

  setSelectedTab(tab:string) {
    this.nameText.set("");
    this.descriptionText.set("");
    this.selectedTab.set(tab);
    this.addButtonDisabled.set(this.getAddButtonDisabled());
  }

  refreshDatabase() {
    this.getCapabilities();
    this.getControlTypes();
    this.getManufacturers();
    this.getModels();
    this.getTypes();
    this.getTasks();
  }

  getTasks() {
    this.apiService.getTasks().subscribe(
      payload => {
        this.tasks.set(payload.payload)
      });
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

  getTypes() {
    this.apiService.getPrefixes().subscribe(
      payload => {
        this.types.set(payload.payload);
    });
  }

  getManufacturers() {
    this.apiService.getManufacturers().subscribe(
      payload => {
        this.manufacturers.set(payload.payload);
    });
  }

  getModels() { 
    this.apiService.getModels().subscribe(
      payload => {
        this.models.set(payload.payload);
        //console.log(payload.payload);
    });
  }

  transformNameText(name:string)
  {
    switch(this.selectedTab())
    {
      case this.tabTypes:
        return name.toUpperCase();
      case this.tabCapabilities:
        return name.toLowerCase();
      case this.tabControlTypes:
        return name.toLowerCase();
      case this.tabModels:
        return name.toUpperCase();
      case this.tabManufacturers:
        return name.toUpperCase();
      case this.tabTasks:
        return startCase(name.toLowerCase());
      default:
        return name;
    }
  }

  nameChanged(name:string) {
    this.nameText.set(this.transformNameText(name));
    this.addButtonDisabled.set(this.getAddButtonDisabled());
  }
  
  transformDescriptionText(description:string)
  {
    switch(this.selectedTab())
    {
      case this.tabTypes:
        return startCase(description.toLowerCase());
      case this.tabCapabilities:
        return description.toLowerCase();
      case this.tabControlTypes:
        return description.toLowerCase();
      case this.tabModels:
        return description.toUpperCase();
      case this.tabManufacturers:
        return description.toUpperCase();
      case this.tabTasks:
        return description;
      default:
        return description;
    }
  }

  descriptionChanged(description:string) {
    this.descriptionText.set(this.transformDescriptionText(description));
    this.addButtonDisabled.set(this.getAddButtonDisabled());
  }

  manufacturerChanged(mfr:string) {
    this.manufacturerID.set(this.manufacturers().find(item => item.name == mfr)?.id || 0);
    console.log(`${this.manufacturerID}`);
    this.addButtonDisabled.set(this.getAddButtonDisabled());
  }

  getManufacturerValid(): boolean {
    let result = false

    result = this.manufacturerID() != 0;

    return result;
  }

  getDescriptionTextValid(): boolean {
    let result = false;

    switch(this.selectedTab())
    {
      case this.tabTypes:
        result = this.descriptionText().length != 0;
        break;
      case this.tabModels:
        //not used
        break;
      case this.tabManufacturers:
        //not used
        break;
      case this.tabCapabilities:
        //not used
        break;
      case this.tabControlTypes:
        //not used
        break;
      case this.tabTasks:
        //not used
        result = this.descriptionText().length != 0;
        break;
    }

    return result;
  }

  getNameTextValid(): boolean { 
    let result = false;

    switch(this.selectedTab())
    {
      case this.tabTypes:
        result = this.nameText().length == 3;
        break;
      case this.tabModels:
        result = this.nameText().length != 0;
        break;
      case this.tabManufacturers:
        result = this.nameText().length != 0;
        break;
      case this.tabCapabilities:
        result = this.nameText().length > 3;
        break;
      case this.tabControlTypes:
        result = this.nameText().length != 0;
        break;
      case this.tabTasks:
        result = this.nameText().length > 3;
        break;
    }

    return result;
  }

  getAddButtonDisabled():boolean {
    let enabled = false;

    switch(this.selectedTab()) 
    {
      case this.tabModels:
        enabled = this.getNameTextValid() && this.getManufacturerValid(); 
        break;
      case this.tabManufacturers:
        enabled = this.getNameTextValid();
        break;
      case this.tabCapabilities:
        enabled = this.getNameTextValid();
        break;
      case this.tabControlTypes:
        enabled = this.getNameTextValid();
        break;
      default:
        enabled = this.getDescriptionTextValid() && this.getNameTextValid();
    }

    return !enabled;
  }

  addSelected(tab:string) {
    switch(tab) {
      case this.tabTypes:
        this.addPrefix();
        break;
      case this.tabModels:
        this.addModel();
        break;
      case this.tabManufacturers:
        this.addManufacturer();
        break;
      case this.tabCapabilities:
        this.addCapability();
        break;
      case this.tabControlTypes:
        this.addControlType();
        break;
      case this.tabTasks:
        this.addTask();
        break;
    }
  }

  onCloseMessage() {
    this.showMessage.set(false);
  }
  
  onDeviceSubmitted(payload:NewDevicePayload) {
    let result = this.apiService.createNewDevice(payload, (result:boolean) => { 
      //only refresh when successful
      if (result) { this.refreshDatabase(); }
      this.showMessage.set(true);
    });

    console.log(result);
  }

  addPrefix() {
    console.log(`TYPE -> ${this.nameText}: DESCRIPTION -> ${this.descriptionText}`);
    this.apiService.createNewPrefix(new DescriptiveMember(0, this.nameText(), this.descriptionText()), (result:boolean, reason:string) => {
      this.messageTitle.set(`${result === true ? "Successfully Added" : "Failed To Add"} Device Type Prefix`);
      this.messageBody.set(reason)
      this.showMessage.set(true);
    });
  }

  addModel() {
    console.log(`MODEL -> ${this.nameText}: MFR ID -> ${this.manufacturerID}`);
    this.apiService.createNewModel("", () => {});
  }

  addManufacturer() {
    console.log(`MFR -> ${this.nameText}`);
    this.apiService.createNewManufacturer(new DescriptiveMember(0, this.nameText(), ""), () => {});
  }

  addCapability() {
    console.log(`CAPABILITY -> ${this.nameText}`);
    this.apiService.createNewCapability(new DescriptiveMember(0, this.nameText(), ""), () => {});
  }

  addControlType() {
    console.log(`CONTROL TYPE -> ${this.nameText}`);
    this.apiService.createNewControlMethod(new DescriptiveMember(0, this.nameText(), ""), () => {});
  }

  addTask() {
    console.log(`TASK -> ${this.nameText}: DESCRIPTION -> ${this.descriptionText}`);
    this.apiService.createNewTask(new DescriptiveMember(0, this.nameText(), this.descriptionText()), () => {});
  }
}
