import { Component, signal, inject } from '@angular/core';
import { Navigation } from '../widgets/navigation/navigation';
import { Member } from '../models/member/member.model';
import { ApiService } from '../services/api/api.service';
import { DevicePane } from "../widgets/device-pane/device-pane";

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
  types = signal<Member[]>([])
  manufacturers = signal<Member[]>([])
  models = signal<Member[]>([])
  tasks = signal<Member[]>([])

  btnText = "Add Device";
  tabDashboard = 'dashboard';
  tabTypes = 'types';
  tabModels = 'models';
  tabManufacturers = 'manufacturers';
  tabCapabilities = 'capabilities';
  tabControlTypes = 'controltypes';
  tabTasks = 'tasks';

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

  setSelectedTab(tab:string)
  {
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
    });
  }
}
