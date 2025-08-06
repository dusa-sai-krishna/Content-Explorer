import {Component, computed, input} from '@angular/core';
import {Card} from "primeng/card";
import {Episode, Movie, Show} from "../../media.model";

@Component({
  selector: 'app-content-card',
  imports: [
    Card
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.css'
})
export class ContentCardComponent {
  content = input.required<Movie|Episode|Show >();
  posterImg = computed(()=>{
    if(this.content().images?.poster.length!==0){
      return `https://${this.content().images?.poster[0]}`
    }
    else{
      return "https://placehold.co/600x400/000000/FFFFFF"
    }
  })
  contentTitle= computed(()=>this.content().title)
  rating = computed(()=>this.content().rating?.toFixed(1) ?? "0.0")
  year = computed(()=>this.content().year ?? 1111)
}
