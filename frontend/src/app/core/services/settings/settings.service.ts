import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Settings } from "../../models/settings/settings";
import { Preferences } from "../../models/settings/preferences";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiUrl = `${environment.apiUrl}/settings`;

  constructor(private http: HttpClient) {}

  getSettings(): Observable<Settings> {
    return this.http.get<Settings>(this.apiUrl);
  }

  updatePreferences(data: Preferences): Observable<any> {
    return this.http.put(`${this.apiUrl}/preferences`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/password`, data);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/account`);
  }
}