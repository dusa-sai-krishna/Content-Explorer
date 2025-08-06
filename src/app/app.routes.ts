import { Routes } from '@angular/router';
import {NotfoundComponent} from "./notfound.component/notfound.component";
import {HomeComponent} from "./home.component/home.component";
import {
    SearchResultsComponent
} from "./searchResults/search-results.component/search-results.component";

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"search/:searchType",
        component:SearchResultsComponent
    },
    {
        path:"**",
        component:NotfoundComponent
    }
];
