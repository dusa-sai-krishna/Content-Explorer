import {Component, inject, input, OnInit} from '@angular/core';
import {
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

const destructureGenre = (genreList:{label:string,value:string}[])=>{
  return genreList.map(genre=>genre.value);
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
    NgIf
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

  }


  protected ngForm = new FormGroup({
  byCountry:new FormControl(false),
    genreList:new FormControl(),
    // subGenreList:new FormControl()
})


  onSubmit() {
  console.log(this.ngForm)
    if(this.ngForm.valid){
      const country=this.ngForm.value.byCountry ?? false
      let genres="";
      if(this.ngForm.value.genreList){
        genres = destructureGenre(this.ngForm.value.genreList).join(",")
      }

      this._router.navigate([], {
        relativeTo: this._route,
        queryParams:{country,genres,page:"1"},
        queryParamsHandling: 'merge'
      }).then(() => console.log("Filter State changed!!!"));

    }
  }
}
