import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Preferences } from "../../models/settings/preferences";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiUrl = `${environment.apiUrl}/settings`;

  constructor(private http: HttpClient) {}

  getSettings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updatePreferences(preferences: Preferences): Observable<any> {
    return this.http.put(`${this.apiUrl}/preferences`, preferences);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/password`, data);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/account`);
  }
}