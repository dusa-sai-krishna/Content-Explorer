import {effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {
    RESPONSE_MOVIES_BODY,
    RESPONSE_SEARCH_BODY,
    RESPONSE_SHOWS_BODY
} from "./response.model";
import {map, Observable, tap} from "rxjs";
import {Episode, Movie, Show} from "./media.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private _httpClient = inject(HttpClient);
    public COUNTRY = signal("in");
    private _trendingMovies = signal<Movie[]>([]);
    private _trendingShows = signal<Show[]>([]);
    public trendingMovies = this._trendingMovies.asReadonly();
    public trendingShows = this._trendingShows.asReadonly();
    private _totalPages = signal<number>(1);
    totalPages = this._totalPages.asReadonly();


    constructor() {
        effect(() => {
            //calling for trending movies
            let params = new HttpParams()
                .set("extended", "full,images")
                .set("countries", this.COUNTRY())

            this._httpClient.get<RESPONSE_MOVIES_BODY[]>("https://api.trakt.tv/movies/trending", {params}).pipe(
                map(response_arr => {
                    return response_arr.map(response => {
                        return response.movie
                    })
                })
            ).subscribe({
                    next: (trendingMovies) => {
                        this._trendingMovies.set(trendingMovies)
                    }
                }
            )

            //calling for trending shows
            this._httpClient.get<RESPONSE_SHOWS_BODY[]>("https://api.trakt.tv/shows/trending", {params}).pipe(
                map(response_arr => {
                    return response_arr.map(response => {
                        return response.show
                    })
                })
            ).subscribe(res => this._trendingShows.set(res))
        });


    }

    searchUserInput(
        searchType: "movie" | "show" | "episode", queryParams: {
            query: string;
            page: string;
            countries: string;
            genres: string
        } | undefined
    ): Observable<(Movie | Show | Episode)[]> {

        let params = new HttpParams();

        Object.entries(queryParams!).forEach(([key, value]) => {
            if (key === "countries" && value!=="false") {
                console.log("countries:",key,value)
                params = params.set("countries", this.COUNTRY());
            } else if(key!=="countries" && value){
                // console.log(key,value)
                params = params.set(key,value);
            }
        });
        
        //default params
        params = params.set("extended","full,images")
            .set("limit",12)

        return this._httpClient
            .get<RESPONSE_SEARCH_BODY[]>(`https://api.trakt.tv/search/${searchType}`, { params,observe:"response"})
            .pipe(
                tap((response)=>{
                    const totalPages = response.headers.get("X-Pagination-Page-Count") ?? "1";
                    this._totalPages.set(Number(totalPages))
                    console.log("Response\n",response)
                })
                ,map(response =>
                    response.body!
                        .map(item => {
                            if (searchType === 'movie') return item.movie;
                            if (searchType === 'show') return item.show;
                            if (searchType === 'episode') return item.episode;
                            return undefined;
                        })
                        .filter((item): item is Movie | Show | Episode => item !== undefined)
                )
            );
    }


}