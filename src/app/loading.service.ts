import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = signal(true);
  isLoading = this._isLoading.asReadonly();

  set(bool:boolean){
    this._isLoading.set(bool);
  }

}
