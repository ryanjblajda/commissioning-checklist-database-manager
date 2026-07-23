import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DescriptiveMember, DescriptiveMemberPayload, MemberPayload } from '../../models/member/member.model';
import { Observable } from 'rxjs';
import { DevicePayload, DeviceTypePayload, NewDevicePayload } from '../../models/device/device.model';
import { TaskPayload } from '../../models/task/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/';
  
  // Modern way to inject dependencies in Angular
  private http = inject(HttpClient);

  getCapabilities(): Observable<MemberPayload> {
    return this.http.get<MemberPayload>(`${this.apiUrl}get/capabilities`)
  }

  getControlTypes(): Observable<MemberPayload> {
    return this.http.get<MemberPayload>(`${this.apiUrl}get/controltypes`)
  }

  getPrefixes(): Observable<DeviceTypePayload> {
    return this.http.get<DeviceTypePayload>(`${this.apiUrl}get/prefixes`)
  }

  getPrefix(prefix: string): Observable<DeviceTypePayload> {
    return this.http.get<DeviceTypePayload>(`${this.apiUrl}get/prefixes/${prefix}`)
  }

  getTasks(): Observable<TaskPayload> {
    return this.http.get<TaskPayload>(`${this.apiUrl}get/tasks`)
  }

  getModels(): Observable<DevicePayload> {
    return this.http.get<DevicePayload>(`${this.apiUrl}get/models`)
  }

  getModel(model: string): Observable<MemberPayload> {
    return this.http.get<MemberPayload>(`${this.apiUrl}get/models/${model}`)
  }

  getManufacturers(): Observable<DescriptiveMemberPayload> {
    return this.http.get<DescriptiveMemberPayload>(`${this.apiUrl}get/manufacturers`)
  }

  getManufacturer(manufacturer: string): Observable<MemberPayload> {
    return this.http.get<MemberPayload>(`${this.apiUrl}get/manufacturers/${manufacturer}`)
  }

  createNewDevice(payload:NewDevicePayload, callback:CallableFunction) {
    let result = false;

    this.http.post<any>(`${this.apiUrl}set/device`, payload).subscribe((payload) => {
      result = payload.success;
    });
  }

  createNewModel(payload:string, callback:CallableFunction) {
    let result = false;

    this.http.post<any>(`${this.apiUrl}set/model`, payload).subscribe((payload) => {
      result = payload.success;
    });
  }

  createNewPrefix(payload:DescriptiveMember, callback:CallableFunction) {
    let result = false;

    this.http.post<any>(`${this.apiUrl}set/prefix`, payload).subscribe((response) => {
      console.log(response)
      callback(response.success, response.reason);
    });
  }

  createNewManufacturer(payload:DescriptiveMember, callback:CallableFunction) {
    let result = false;

    this.http.post<any>(`${this.apiUrl}set/manufacturer`, payload).subscribe((payload) => {
      result = payload.success;
      callback(result);
    });
  }

  createNewControlMethod(payload:DescriptiveMember, callback:CallableFunction) {
    let result = false;

    this.http.post<any>(`${this.apiUrl}set/control`, payload).subscribe((payload) => {
      result = payload.success;
      callback(result);
    });
  }

  createNewCapability(payload:DescriptiveMember, callback:CallableFunction) {
    let result = false;

    this.http.post<any>(`${this.apiUrl}set/capability`, payload).subscribe((payload) => {
      result = payload.success;
      callback(result);
    });
  }

  createNewTask(payload:DescriptiveMember, callback:CallableFunction)  {
    let result = false;

    this.http.post<any>(`${this.apiUrl}set/task`, payload).subscribe((payload) => {
      result = payload.success;
      callback(result);
    });
  }
}