export type  Movie={
    title:string,
    year:number,
    ids: {
        trakt: number,
        slug: string,
        imdb: string,
        tmdb: number,
    }
    images?:Images
    rating?:number
}

export type Show = {
    title: string,
    year: number,
    ids: {
        trakt: number,
        slug: string,
        tvdb: number,
        imdb: string,
        tmdb: number,
    }
    images?:Images
    rating?:number
}

export type Season = {
    number: number
    ids: {
        trakt: number,
        tvdb: number,
        tmdb: number,
    }
    images?:Images
}

export type Episode = {
    season: number,
    number: number,
    title: string,
    year:number
    ids: {
        trakt: number,
        tvdb: number,
        imdb: string,
        tmdb: number,
    },
    images?:Images
    rating?:number
}

export type Person = {
    name: string,
    ids: {
        trakt: number,
        slug: string,
        imdb: string,
        tmdb: number,
    },
    images?:Images
}

export type Images={
    "fanart":string[]
    "poster":string[]
    "logo":string[]
    "cleanart":string[]
    "banner":string[]
    "thumb":string[]
    "headshot":string[]

}
