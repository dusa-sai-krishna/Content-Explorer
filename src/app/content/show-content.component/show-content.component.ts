import {
    Component,
    computed,
    inject,
    input,
    OnInit,
    signal
} from '@angular/core';
import {Movie, Season} from "../../media.model";
import {ApiService} from "../../api.service";
import {DecimalPipe, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {Carousel} from "primeng/carousel";
import {LoadingService} from "../../loading.service";
import {Dialog} from "primeng/dialog";

@Component({
    selector: 'app-show-content',
    imports: [
        TitleCasePipe,
        Carousel,
        DecimalPipe,
        Dialog,
        NgOptimizedImage
    ],
    templateUrl: './show-content.component.html'
})
export class ShowContentComponent implements OnInit {
    private _apiService = inject(ApiService)
    private _loadingService = inject(LoadingService);
    isLoading = this._loadingService.isLoading;
    id = input<string>("");
    movie = signal<Movie | undefined>(undefined);
    seasons = signal<Season[]|undefined>(undefined);

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
        this._apiService.fetchShowDetails(this.id()).subscribe(res => {
            // console.log("Got movie",res)
            this.movie.set(res)
        })

        this._apiService.fetchSeasonDetails(this.id()).subscribe(res=>this.seasons.set(res))
    }

}
