import { Injectable } from '@angular/core';
import { Theme } from '../../models/settings/preferences';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly STORAGE_KEY = 'money-pilot-theme';

  constructor() {}

  applyTheme(theme: Theme): void {
    let selectedTheme: Theme = theme;

    if (theme === 'system') {
      selectedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${selectedTheme}-theme`);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  loadTheme(): void {
    const savedTheme = (localStorage.getItem(this.STORAGE_KEY) as Theme) || 'light';
    
    this.applyTheme(savedTheme);
  }

  currentTheme(): Theme {
    return (localStorage.getItem(this.STORAGE_KEY) as Theme) || 'light';
  }
}
