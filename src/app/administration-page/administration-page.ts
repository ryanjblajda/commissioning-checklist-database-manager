import { Component, signal, inject } from '@angular/core';
import { Navigation } from '../widgets/navigation/navigation';
import { Member } from '../models/member/member.model';
import { ApiService } from '../services/api/api.service';
import { DevicePane } from "../widgets/device-pane/device-pane";
import { Device, DeviceType } from '../models/device/device.model';

@Component({
  selector: 'app-administration-page',
  imports: [Navigation, DevicePane],
  templateUrl: './administration-page.html',
  styleUrl: './administration-page.scss',
})
export class AdministrationPage {
  private apiService = inject(ApiService);

  capabilities = signal<Member[]>([])
  controls = signal<Member[]>([])
  types = signal<DeviceType[]>([])
  manufacturers = signal<Member[]>([])
  models = signal<Device[]>([])
  tasks = signal<Member[]>([])

  btnText = "Add Device";
  tabDashboard = 'dashboard';
  tabTypes = 'types';
  tabModels = 'models';
  tabManufacturers = 'manufacturers';
  tabCapabilities = 'capabilities';
  tabControlTypes = 'controltypes';
  tabTasks = 'tasks';
  tabSearch = 'search'

  tabs = [
    this.tabDashboard, this.tabDashboard, this.tabModels, 
    this.tabManufacturers, this.tabCapabilities, this.tabControlTypes, this.tabTasks
  ]
  selectedTab = signal<string>(this.tabs[0]);

  constructor() { 
    this.getCapabilities();
    this.getControlTypes();
    this.getManufacturers();
    this.getModels();
    this.getTypes();
    this.getTasks();
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
      case this.tabTasks: result = true; break;
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
    this.selectedTab.set(tab);
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
        console.log(payload.payload);
    });
  }
}
