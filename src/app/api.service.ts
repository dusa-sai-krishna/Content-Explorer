import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _httpClient = inject(HttpClient);

   trendingMovies(){
    this._httpClient.get("https://api.trakt.tv/movies/trending").subscribe((response)=>{console.log(response);})
  }
  searchUserInput(searchType:"movie"|"show"|"episode"|"person", name:string){
      this._httpClient.get(`https://api.trakt.tv/search/${searchType}?query=${name}`).subscribe((response)=>{console.log(response);})
  }
}
