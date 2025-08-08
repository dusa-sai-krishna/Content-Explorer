import {Component, computed, effect, input, signal} from '@angular/core';
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
  content = input.required<any >();
  posterImg = signal<string>("/placeholder-poster.png")
  type = input.required<string>()
  constructor() {
    effect(() => {
      const x = this.content().images?.poster.length ?? 0
      if(x>0){
        setTimeout(()=>  this.posterImg.set(`https://${this.content().images?.poster[0]}`),1000)

      }
      else{
        this.posterImg.set("/placeholder-poster.png")
      }
    });
  }
  // posterImg = computed(()=>{
  //   const x = this.content().images?.poster.length ?? 0
  //   if(x>0){
  //     return `https://${this.content().images?.poster[0]}`
  //   }
  //   else{
  //     return "/placeholder-poster.png"
  //   }
  // })
  contentTitle= computed(()=>this.content().title)
  rating = computed(()=>this.content().rating?.toFixed(1) ?? "0.0")
  year = computed(()=>this.content().year ?? 1111)
}
