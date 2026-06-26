// data.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberPayload } from '../../models/member/member.model';
import { Observable } from 'rxjs';
import { DevicePayload, DeviceTypePayload } from '../../models/device/device.model';

// Define an interface for type safety
export interface Post {
  id: number;
  title: string;
  body: string;
}

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

  getTasks(): Observable<MemberPayload> {
    return this.http.get<MemberPayload>(`${this.apiUrl}get/tasks`)
  }

  getModels(): Observable<DevicePayload> {
    return this.http.get<DevicePayload>(`${this.apiUrl}get/models`)
  }

  getModel(model: string): Observable<MemberPayload> {
    return this.http.get<MemberPayload>(`${this.apiUrl}get/models/${model}`)
  }

  getManufacturers(): Observable<MemberPayload> {
    return this.http.get<MemberPayload>(`${this.apiUrl}get/manufacturers`)
  }

  getManufacturer(manufacturer: string): Observable<MemberPayload> {
    return this.http.get<MemberPayload>(`${this.apiUrl}get/manufacturers/${manufacturer}`)
  }
}