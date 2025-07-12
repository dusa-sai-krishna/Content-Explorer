import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {COUNTRIES} from "../../../data/COUNTRIES";
import {Select} from "primeng/select";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {Button} from "primeng/button";
import {ApiService} from "../api.service";
import {ThemeService} from "../../theme/theme.service";
@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Select,
    FloatLabel,
    InputText,
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _apiService = inject(ApiService);
  private _themeService = inject(ThemeService)
  public theme = this._themeService.theme;

  ngForm = new FormGroup({
    country: new FormControl<string>("in", [Validators.required]),
    searchType: new FormControl<"movie"|"show"|"episode"|"person">("movie",[Validators.required]),
    name : new FormControl<string>("",[Validators.required]),
  })
  COUNTRIES = COUNTRIES;
  searchTypeValues=["movie" , "show" , "episode" , "person" ]

  onSubmit() {
    if(this.ngForm.valid) {
      this._apiService.searchUserInput(this.ngForm.controls.searchType.value!, this.ngForm.value.name!);
    }
    else{
      window.alert("You have not entered the name field!");
    }
  }

  onToggleTheme() {
    this._themeService.toggleDarkMode();
  }
}
