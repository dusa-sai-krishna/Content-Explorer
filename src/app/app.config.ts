import {ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePrimeNG} from "primeng/config";
import {MyPreset} from "../theme/myPreset.theme";
import {HttpHandlerFn, HttpRequest, HttpResponse, provideHttpClient, withInterceptors} from "@angular/common/http";
import {LoadingService} from "./loading.service";
import {catchError, finalize, of, tap, throwError} from "rxjs";
import {TRAKT_API_KEY} from "../../TRAKT_API_KEY";
import {CacheService} from "./cache.service";
import {ErrorService} from "./error.component/error.service";

function loadingInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    let loadingService = inject(LoadingService);
    loadingService.set(true);
    return next(request).pipe(
        finalize(() => loadingService.set(false))
    );
}

function headerInsertionInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    let newRequest = request.clone({
        setHeaders: {
            'Content-Type': 'application/json',
            'User-Agent': 'Content-Explorer-1.0',
            'trakt-api-key': TRAKT_API_KEY,
            'trakt-api-version': '2'
        }
    })

    return next(newRequest);
}

function cacheInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    let cacheService = inject(CacheService);

    if (request.method !== 'GET') return next(request);

    const cachedResponse = cacheService.get(request.urlWithParams);
    if (cachedResponse) {
        return of(cachedResponse);
    }

    return next(request).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                cacheService.set(request.urlWithParams, event);
            }
        })
    );

}

function errorHandlingInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {

    const errorService = inject(ErrorService);

    return next(request).pipe(
        catchError(error => {
            console.log(error);
            errorService.set(error.message)
            return throwError(() => error)
        })
    )
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withInterceptors([
            loadingInterceptor, headerInsertionInterceptor, cacheInterceptor, errorHandlingInterceptor])),
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: MyPreset,
                options: {
                    darkModeSelector: '.my-app-dark'
                }
            },
            ripple: true
        })
    ]
};
