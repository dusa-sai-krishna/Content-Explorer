import {Component, inject} from '@angular/core';

import {ApiService} from "../api.service";

import {HomeCarousel} from "./home-carousel/home-carousel";


@Component({
  selector: 'app-home',
  imports: [
    HomeCarousel
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  private _apiService = inject(ApiService);
  trendingMovies = this._apiService.trendingMovies
  trendingShows = this._apiService.trendingShows


}
