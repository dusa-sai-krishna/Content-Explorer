import {Component, computed, inject, input} from '@angular/core';
import {Movie, Show} from "../../media.model";
import {Carousel} from "primeng/carousel";
import {DecimalPipe, NgOptimizedImage} from "@angular/common";
import {LoadingService} from "../../loading.service";
import {Skeleton} from "primeng/skeleton";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-carousel',
  imports: [
    Carousel,
    DecimalPipe,
    Skeleton,
    RouterLink
  ],
  templateUrl: './home-carousel.html',
  styleUrl: './home-carousel.css'
})
export class HomeCarousel {
content = input.required<any[]>();
title = input.required<string>();
type = input.required<string>()
private _loadingService= inject(LoadingService);
isLoading = this._loadingService.isLoading;
sorted_content = computed(()=>{
  return this.content().sort((left,right)=>(left.rating!-right.rating!)*-1)
})
}
