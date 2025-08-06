import {Episode, Movie, Person, Show} from "./media.model";

export type RESPONSE_MOVIES_BODY ={
    watchers:number,
    movie:Movie
}

export type RESPONSE_SHOWS_BODY={
    watchers:number,
    show:Show
}


export type RESPONSE_SEARCH_BODY={
    type:"movie"|"episode"|"show"|"person"
    score:  number,
    movie?:Movie
    episode?:Episode
    show?:Show
    person?:Person
}