import {Component, inject} from '@angular/core';
import {ThemeService} from "../theme/theme.service";
import {Button} from "primeng/button";
import {RouterOutlet} from "@angular/router";
import {ErrorService} from "./error.component/error.service";
import {ErrorComponent} from "./error.component/error.component";
import {ApiService} from "./api.service";
import {HeaderComponent} from "./header.component/header.component";

@Component({
  selector: 'app-root',
  imports: [
    Button,
    RouterOutlet,
    ErrorComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private _themeService = inject(ThemeService)
  private _errorService = inject(ErrorService);
  private _apiService = inject(ApiService);
  errorMessage = this._errorService.errorMessage;
  public theme = this._themeService.theme;

  onToggleTheme() {
    this._themeService.toggleDarkMode();
  this._apiService.trendingMovies()
  }

}
