import {Component, computed, inject} from '@angular/core';
import {ErrorService} from "./error.service";
import {Dialog} from "primeng/dialog";
import {Button} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-error',
    imports: [
        Dialog,
        Button
    ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
private _errorService = inject(ErrorService);
private _router = inject(Router);
errorMessage=this._errorService.errorMessage;
visible=computed(()=>{
    return !! this.errorMessage();
})()

    onClick(){
    this._errorService.clear();
    this._router.navigateByUrl('/').then(r => console.log(r));
    }
}
