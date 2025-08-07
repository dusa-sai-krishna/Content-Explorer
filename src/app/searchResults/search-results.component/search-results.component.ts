import {
    Component,
    effect,
    inject,
    input,
    signal
} from '@angular/core';
import { ContentCardComponent } from "../content-card.component/content-card.component";
import { ApiService } from "../../api.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { Episode, Movie, Show } from "../../media.model";
import { Paginator, PaginatorState } from "primeng/paginator";
import { toSignal } from '@angular/core/rxjs-interop'; // Required for signal conversion
import { map } from "rxjs";
import {FilterComponent} from "../filter.component/filter.component";

@Component({
    selector: 'app-search-results',
    standalone: true,
    imports: [
        ContentCardComponent,
        Paginator,
        FilterComponent,
        RouterLink
    ],
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.css'
})
export class SearchResultsComponent  {
    searchType = input.required<"movie" | "show" | "episode">();

    _apiService = inject(ApiService);
    _router = inject(Router);
    _route = inject(ActivatedRoute);
    first = 0;
    totalPages = this._apiService.totalPages;

    searchResult = signal<(Movie | Show | Episode)[]>([]);
    query = signal<string>("");

    // 👇 Convert route query params to signal
    queryParamSignal = toSignal(
        this._route.queryParamMap.pipe(
            map(params => ({
                query: params.get('query') || " ", //required so default
                // will be space
                page: (params.get('page') || '1'),
                countries:(params.get("country") || "false"),
                genres:(params.get("genres")) || "",
                years:(params.get("years")) || "",
                runtimes:(params.get("runtimes")) || "",
                imdb_ratings:(params.get("imdb_ratings")) || ""
            }))
        )
    );

    constructor() {
        effect(() => {
            const type = this.searchType();
            console.log("Country",this.queryParamSignal()?.countries);

            this._apiService.searchUserInput(type,this.queryParamSignal()).subscribe(results => {
                this.searchResult.set(results);
            // console.log("Request sent")
            });
        });
    }

    onPageChange(event: PaginatorState) {
        const page = (event.page ?? 0) + 1; // Trakt pages are 1-based
        this.first = event.first ?? 0;
        this._router.navigate([], {
            relativeTo: this._route,
            queryParams: { page },
            queryParamsHandling: 'merge'
        }).then(() => console.log("Paginator State changed!!!"));
    }
}
