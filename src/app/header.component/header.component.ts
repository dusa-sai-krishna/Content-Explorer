import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {COUNTRIES} from "../../../data/COUNTRIES";
import {Select, SelectChangeEvent} from "primeng/select";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {Button} from "primeng/button";
import {ApiService} from "../api.service";
import {ThemeService} from "../../theme/theme.service";
import {Router} from "@angular/router";
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
  private _router = inject(Router)
  public theme = this._themeService.theme;
  public COUNTRY = this._apiService.COUNTRY;

  ngForm = new FormGroup({
    country: new FormControl(this.COUNTRY(), [Validators.required]),
    searchType: new FormControl<"movie"|"show"|"episode"|"person">("movie",[Validators.required]),
    query : new FormControl<string>("",[Validators.required]),
  })
  COUNTRIES = COUNTRIES;
  searchTypeValues=["movie" , "show" , "episode" , "person" ]

  onSubmit() {
    if(this.ngForm.valid && this.ngForm.value.searchType && this.ngForm.value.query) {
      const searchType=this.ngForm.value.searchType;
      const query = this.ngForm.value.query;
      this._router.navigate(["/search",searchType],{
        queryParams:{'query':query }
      }).then(r=>console.log(r))
      // this._apiService.searchUserInput(this.ngForm.controls.searchType.value!, this.ngForm.value.query!);
    }
    else{
      window.alert("You have not entered the query field!");
    }
  }

  onToggleTheme() {
    this._themeService.toggleDarkMode();
  }

  onCountryChange(event: SelectChangeEvent) {
    this._apiService.COUNTRY.set(event.value)

  }
}
