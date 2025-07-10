import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {NotfoundComponent} from "./notfound.component/notfound.component";

export const routes: Routes = [
    {
        path:"",
        component:AppComponent
    },
    {
        path:"**",
        component:NotfoundComponent
    }
];
