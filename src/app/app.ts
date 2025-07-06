import {Component, inject} from '@angular/core';
import {ThemeService} from "../theme/theme.service";
import {Button} from "primeng/button";


@Component({
  selector: 'app-root',
  imports: [
    Button
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private _themeService = inject(ThemeService)
  public theme = this._themeService.theme;


  onToggleTheme() {
    this._themeService.toggleDarkMode();
  }
}
