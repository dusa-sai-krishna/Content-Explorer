import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private _errorMessage = signal<string>("");
  errorMessage = this._errorMessage.asReadonly();

  public set(msg:string):void {
    this._errorMessage.update(()=>msg);
  }
  public clear(){
    this._errorMessage.update(()=>"");
  }

}
