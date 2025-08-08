import {Component, inject, input, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import {Checkbox} from "primeng/checkbox";
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {movieGenre, showGenre} from "../../../../data/GENRES";
import {MultiSelect} from "primeng/multiselect";
import {NgIf, NgStyle} from "@angular/common";
import {Slider} from "primeng/slider";

const destructureGenre = (genreList:{label:string,value:string}[])=>{
  return genreList.map(genre=>genre.value);
}

function isYearRangeValid(control:AbstractControl)
{
 const minYear = control.get("minYear")?.value
  const maxYear = control.get("maxYear")?.value
  if(Number(minYear)<=Number(maxYear)){
    return null;
  }
  else{
    return {invalidRangeOfYears:true}
  }
}

function isRuntimeRangeValid(control:AbstractControl)
{
 const minRuntime = control.get("minRuntime")?.value
  const maxRuntime = control.get("maxRuntime")?.value
  if(Number(minRuntime)<=Number(maxRuntime)){
    return null;
  }
  else{
    return {invalidRangeOfRuntimes:true}
  }
}

function isRatingRangeValid(control:AbstractControl)
{
 const minRating = control.get("minRating")?.value
  const maxRating = control.get("maxRating")?.value
  if(Number(minRating)<=Number(maxRating)){
    return null;
  }
  else{
    return {invalidRangeOfRatings:true}
  }
}


@Component({
  selector: 'app-filter',
  imports: [
    ReactiveFormsModule,
    Checkbox,
    FormsModule,
    ButtonDirective,
    MultiSelect,
    NgStyle,
    NgIf,
    Slider
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  searchType = input.required<"movie" | "show" | "episode">();
genres: { label: string; value: string; subgenres: { label: string; value: string; }[]; }[]=[]


ngOnInit() {
  if(this.searchType()==="movie"){
    this.genres = movieGenre
  }
  else if(this.searchType()==="show"){
    this.genres = showGenre;
  }
  else{
    this.genres=[]
  }

  // Populate form with existing query params
  this._route.queryParams.subscribe(params => {
    this.ngForm.patchValue({
      byCountry: params['country'] === 'true',
      genreList: params['genres'] ? this.genres.filter(g => params['genres'].split(',').includes(g.value)) : null,
      years: {
        minYear: params['years'] ? parseInt(params['years'].split('-')[0]) : 1990,
        maxYear: params['years'] ? parseInt(params['years'].split('-')[1]) : 2025
      },
      runtimes: {
        minRuntime: params['runtimes'] ? parseInt(params['runtimes'].split('-')[0]) : 20,
        maxRuntime: params['runtimes'] ? parseInt(params['runtimes'].split('-')[1]) : 240
      },
      imdbRatings: {
        minRating: params['imdb_ratings'] ? parseFloat(params['imdb_ratings'].split('-')[0]) : 0.0,
        maxRating: params['imdb_ratings'] ? parseFloat(params['imdb_ratings'].split('-')[1]) : 10.0
      }
    });
  });
}


  protected ngForm = new FormGroup({
  byCountry:new FormControl(false),
    genreList:new FormControl(),
    years:new FormGroup({
      minYear:new FormControl(1990),
      maxYear:new FormControl(2025)
    },{validators:[isYearRangeValid]}),
    runtimes:new FormGroup({
      minRuntime:new FormControl(20),
      maxRuntime:new FormControl(240)
    },{validators:[isRuntimeRangeValid]}),
    imdbRatings:new FormGroup({
      minRating:new FormControl(0.0),
      maxRating:new FormControl(10.0)
    },{validators:[isRatingRangeValid]})
})


  onSubmit() {
    if(this.ngForm.valid){
      const country=this.ngForm.value.byCountry ?? false
      let genres="";
      if(this.ngForm.value.genreList){
        genres = destructureGenre(this.ngForm.value.genreList).join(",")
      }
      const minYear = this.ngForm.value.years?.minYear ?? 1990
      const maxYear = this.ngForm.value.years?.maxYear ?? 2025
      const years = `${minYear}-${maxYear}`
      
      const minRuntime = this.ngForm.value.runtimes?.minRuntime ?? 20
      const maxRuntime = this.ngForm.value.runtimes?.maxRuntime ?? 240
      const runtimes = `${minRuntime}-${maxRuntime}`
      
      const minRating = this.ngForm.value.imdbRatings?.minRating ?? 0.0
      const maxRating = this.ngForm.value.imdbRatings?.maxRating ?? 10.0
      const imdb_ratings = `${minRating.toFixed(1)}-${maxRating.toFixed(1)}`

      this._router.navigate([], {
        relativeTo: this._route,
        queryParams:{country,genres,page:"1",years,runtimes,imdb_ratings},
        queryParamsHandling: 'merge'
      }).then(() => console.log("Filter State changed!!!"));

    }
    else{
      console.log(this.ngForm)
      window.alert(this.ngForm.errors)
    }
  }
}
