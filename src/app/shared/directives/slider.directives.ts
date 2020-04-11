import {Directive, ElementRef, OnInit} from '@angular/core';
declare var $:any;

@Directive({
    selector:'[my-slider]'
})

export class SliderDirectives implements OnInit{
    constructor(elr:ElementRef){
        elr.nativeElement.style.background='red';
    }
    ngOnInit (){

        var owl = $('.owl-carousel');
        console.log(owl);
        owl.owlCarousel({
            items:1,
            loop:true,
            margin:10,
            autoplay:true,
            autoplayTimeout:2000,
            autoplayHoverPause:true
        });
        console.log(owl.owlCarousel);
        // $('.play').on('click',function(){
        //     owl.trigger('play.owl.autoplay',[2000])
        // })
        // $('.stop').on('click',function(){
        //     owl.trigger('stop.owl.autoplay')
        // })
    }
}