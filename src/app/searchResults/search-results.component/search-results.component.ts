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
import {LoadingService} from "../../loading.service";
import {Dialog} from "primeng/dialog";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-search-results',
    standalone: true,
    imports: [
        ContentCardComponent,
        Paginator,
        FilterComponent,
        RouterLink,
        Dialog,
        NgOptimizedImage
    ],
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.css'
})
export class SearchResultsComponent  {
    searchType = input.required<"movie" | "show" | "episode">();

    _apiService = inject(ApiService);
    _router = inject(Router);
    _route = inject(ActivatedRoute);
    _loadingService = inject(LoadingService);
    isLoading = this._loadingService.isLoading;
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
        // Initialize pagination from URL
        effect(() => {
            const params = this.queryParamSignal();
            if (params?.page) {
                const pageNum = parseInt(params.page) - 1;
                this.first = pageNum * 1;
            }
        });

        effect(() => {
            const type = this.searchType();
            this._apiService.searchUserInput(type,this.queryParamSignal()).subscribe(results => {
                this.searchResult.set(results);
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
