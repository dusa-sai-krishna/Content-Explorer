import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ErrorService} from "./error.component/error.service";
import {ErrorComponent} from "./error.component/error.component";
import {HeaderComponent} from "./header.component/header.component";
import {FooterComponent} from "./footer/footer";

@Component({
  selector: 'app-root',
    imports: [
        RouterOutlet,
        ErrorComponent,
        HeaderComponent,
        FooterComponent,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private _errorService = inject(ErrorService);
  errorMessage = this._errorService.errorMessage;


}
