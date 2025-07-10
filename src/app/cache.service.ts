import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private _cache = new Map<string, any>();

  get(key: string): any | null {
    return this._cache.has(key) ? this._cache.get(key) : null;
  }

  set(key: string, value: any): void {
    this._cache.set(key, value);
  }


}
