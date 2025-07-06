import {DOCUMENT, inject, Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    // A. Setting up our dependencies
    // A.1 since we will access localStorage with AnalogJS
    // (which can be used for server side rendering)

    // A.3 we use Angular's DOCUMENT injection token to avoid directly accessing the document object
    private _document = inject(DOCUMENT);

    // B. Initializing our in memory theme store
    private _theme = signal<"dark"|"light">("dark")
    public theme = this._theme.asReadonly();

    // C. Sync and listen to theme changes on service creation
    constructor() {
        // we check the current value in the localStorage to see what theme was set
        // by the code in the index.html file and load that into our _theme$ replay subject
        this.syncThemeFromLocalStorage();
    }

    // C.1 sync with the theme set in the localStorage by our index.html script tag
    private syncThemeFromLocalStorage(): void {

        // we load the appropriate value from the localStorage into our _theme$ replay subject
        this._theme.set(
            localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
        );

    }


    // D. Expose a public function that allows us to change the theme from anywhere in our application
    public toggleDarkMode(): void {
        this._theme.update(oldTheme=>oldTheme === 'dark' ? 'light' : 'dark');
        localStorage.setItem('theme', this._theme());
        this._document.documentElement.classList.toggle("my-app-dark");
    }


}
