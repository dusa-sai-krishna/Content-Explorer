import {
    Component,
    computed,
    inject,
    input,
    OnInit,
    signal
} from '@angular/core';
import {Movie} from "../../media.model";
import {ApiService} from "../../api.service";
import {TitleCasePipe} from "@angular/common";

@Component({
    selector: 'app-movie-content',
    imports: [
        TitleCasePipe
    ],
    templateUrl: './movie-content.component.html',
    styleUrl: './movie-content.component.css'
})
export class MovieContentComponent implements OnInit {
    private _apiService = inject(ApiService)
    id = input<string>("");
    movie = signal<Movie | undefined>(undefined);


    fanartImg = computed(()=> {

        const x = this.movie()?.images?.fanart.length ?? 0
        if( x>0){
            return `https://${this.movie()?.images?.fanart[0]}`
        }
        return "/placeholder-fanart.png"
    })
    posterImg = computed(()=> {

        const x = this.movie()?.images?.poster.length ?? 0
        if( x>0){
            return `https://${this.movie()?.images?.poster[0]}`
        }
        return "/placeholder-poster.png"
    })

    genres = computed(()=>{

        return [...(this.movie()?.genres ?? []),...(this.movie()?.subgenres ?? [])].join("   ")
    })

    year = computed(()=>this.movie()?.year ?? "xxxx")
    certification = computed(()=>this.movie()?.certification ?? "X")
    rating = computed(()=>this.movie()?.rating?.toFixed(1) ?? "X.X")

    ngOnInit() {
        this._apiService.fetchMovieDetails(this.id()).subscribe(res => {
            // console.log("Got movie",res)
            this.movie.set(res)
        })
    }

}
