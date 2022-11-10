import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FeeddataService } from 'src/app/services/feeddata.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  dummycontent =
  "Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services. Apple is the world's largest technology company by revenue (totaling $274.5 billion in 2020) and, since January 2021, the world's most valuable company. As of 2021, Apple is the world's fourth-largest PC vendor by unit sales, and fourth-largest smartphone manufacturer. It is one of the Big Five American information technology companies, along with Amazon, Google, Microsoft, and Facebook."
  ;
  @ViewChild('uiElement', { static: false }) public uiElement!: ElementRef;
  Images: any= [
    {
      src: 'https://loremflickr.com/g/600/400/paris',
      alt: 'Image 1',
    }, {
      src: 'https://loremflickr.com/600/400/brazil,rio',
      alt: 'Image 2'
    }, {
      src: 'https://loremflickr.com/600/400/paris,girl/all',
      alt: 'Image 3'
    }, {
      src: 'https://loremflickr.com/600/400/brazil,rio',
      alt: 'Image 4'
    }, {
      src: 'https://loremflickr.com/600/400/paris,girl/all',
      alt: 'Image 5'
    }, {
      src: 'https://loremflickr.com/600/400/brazil,rio',
      alt: 'Image 6'
    }    
  ];
  config: SwiperOptions = {
    pagination: { 
      el: '.swiper-pagination', 
      clickable: true 
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  }; 
  public Feeds:any=[];
  public feedcount:number = 0;
  public feedindex:number = 0;
  public feedsize:number = 5;
  constructor(private FeedService:FeeddataService) { }

 async ngOnInit(): Promise<void> {
    await this.getFeeds(this.feedindex,this.feedsize);

const stringval = ["a(b)c", "a(c[g]3 {}2)","a(c", "a(c}b","a{ss(s}ss)kks"] ;
stringval.forEach(element => {
  console.log(this.check(element))
  if(this.check(element)){
    console.log("good string");
  }else{
    console.log("bad string");
  }
  
});


  }
   check(expr:string){
    const holder = []
    const openBrackets = ['(','{','[']
    const closedBrackets = [')','}',']']
    for (let letter of expr) { // loop trought all letters of expr
        if(openBrackets.includes(letter)){ // if its oppening bracket
            holder.push(letter)
        }else if(closedBrackets.includes(letter)){ // if its closing
            const openPair = openBrackets[closedBrackets.indexOf(letter)] // find its pair
            if(holder[holder.length - 1] === openPair){ // check if that pair is the last element in the array
                holder.splice(-1,1) // if so, remove it
            }else{ // if its not
                holder.push(letter)
                break // exit loop
            }
        }
    }
    return (holder.length === 0) // return true if length is 0, otherwise false
}
  public async getFeeds(currentindex:number,currentsize:number){
this.FeedService.getFeedByPage(currentindex,currentsize).subscribe((res:any)=>{
  this.Feeds = [...this.Feeds,...res?.articles];
  this.feedcount = res?.totalResults;
  console.log(this.Feeds)
  console.log(res)
},(err)=>{
  console.log(err)
})
  }
  public currentindex :boolean  = false;
  @HostListener('window:scroll', ['$event']) onScrollLoadDataCheck(event:any){
    const nativeElement= this.uiElement.nativeElement;
    // console.log('bottom',nativeElement.scrollHeight,
    // nativeElement.innerHeight,nativeElement.scrollTop,
    // nativeElement.scrollY,nativeElement.clientHeight);
   
   console.log(window.innerHeight +  window.scrollY,document.body.scrollHeight)

    if(window.innerHeight +  window.scrollY >= document.body.scrollHeight + 19 && 
      !this.currentindex){
        this.currentindex = true;
      console.log('bottom');
      this.onScrollLoadData();
    }
   
  
    //  const nativeElement= this.uiElement.nativeElement;
    //  if(nativeElement.clientHeight + Math.round(nativeElement.scrollTop) === nativeElement.scrollHeight  
    //  &&  this.Feeds.length !== this.feedcount){
   
    //  console.log(nativeElement.clientHeight + Math.round(nativeElement.scrollTop),nativeElement.scrollHeight,
    //  this.Feeds.length ,this.feedcount)
    //  }
    
     
  }
  public async onScrollLoadData(){

    
    if(this.Feeds.length !== this.feedcount){
      await this.getFeeds(this.feedindex, this.feedsize);
      this.feedindex +=1;
      this.currentindex = false;
    }

   
  }
}

