import { Component, OnInit } from '@angular/core';
import { NgxCarousel, NgxCarouselStore  } from 'ngx-carousel';
import {DataService} from '../data.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {

  // public carouselTileItems: Array<any>;
  // public carouselTile: NgxCarousel;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private _data: DataService) { }

  currPage = 'Venue';

  ngOnInit() {

    this._data.changeCurPage(this.currPage);

    // this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    //
    // this.carouselTile = {
    //   grid: {xs: 2, sm: 3, md: 3, lg: 4, all: 0},
    //   slide: 2,
    //   speed: 1000,
    //   loop: true,
    //   interval: 6000,
    //   animation: 'lazy',
    //   point: {
    //     visible: true,
    //     pointStyles: `
    //       .ngxcarouselPoint {
    //         list-style-type: none;
    //         text-align: center;
    //         padding: 12px;
    //         margin: 0;
    //         white-space: nowrap;
    //         overflow: auto;
    //         box-sizing: border-box;
    //       }
    //       .ngxcarouselPoint li {
    //         display: inline-block;
    //         border-radius: 50%;
    //         border: 2px solid rgba(0, 0, 0, 0.55);
    //         padding: 4px;
    //         margin: 0 3px;
    //         transition-timing-function: cubic-bezier(.17, .67, .83, .67);
    //         transition: .4s;
    //       }
    //       .ngxcarouselPoint li.active {
    //           background: #6b6b6b;
    //           transform: scale(1.2);
    //       }
    //     `
    //   },
    //   load: 2,
    //   touch: true,
    //   easing: 'ease'
    // };

    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageAutoPlay: true, imageAutoPlayPauseOnHover: true, previewAutoPlay: true, previewAutoPlayPauseOnHover: true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '400px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: '../../assets/images/venue/v1.jpg',
        medium: '../../assets/images/venue/v1.jpg',
        big: '../../assets/images/venue/v1.jpg'
      },
      {
        small: 'http://via.placeholder.com/500x500',
        medium: 'http://via.placeholder.com/500x500',
        big: 'http://via.placeholder.com/500x500'
      },
      {
        small: 'http://via.placeholder.com/500x500',
        medium: 'http://via.placeholder.com/500x500',
        big: 'http://via.placeholder.com/500x500'
      }
    ];
  }

  // public carouselTileLoad(evt: any) {
  //   const len = this.carouselTileItems.length;
  // }
}
