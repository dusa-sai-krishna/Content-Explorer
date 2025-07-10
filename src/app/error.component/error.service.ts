import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private _errorMessage = signal<string>("Something went wrong while fetching data. Redirecting to home");
  errorMessage = this._errorMessage.asReadonly();

  public set(msg:string):void {
    this._errorMessage.update(()=>msg);
  }
  public clear(){
    this._errorMessage.update(()=>"");
  }

}
