import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainpageRoutingModule } from './mainpage-routing.module';
import { FeedComponent } from './components/feed/feed.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule,
    MainpageRoutingModule,
    NgxUsefulSwiperModule
  ],
})
export class MainpageModule { }
