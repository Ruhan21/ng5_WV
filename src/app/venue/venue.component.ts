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

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private _data: DataService) { }

  currPage = 'Venue';

  ngOnInit() {
    window.scrollTo({top: 0, behavior: 'smooth'});

    this._data.changeCurPage(this.currPage);

    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageAutoPlay: true,
        imageAutoPlayPauseOnHover: true,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
        imageAutoPlayInterval: 5000
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
      }, {
        small: '../../assets/images/venue/v2.jpg',
        medium: '../../assets/images/venue/v2.jpg',
        big: '../../assets/images/venue/v2.jpg'
      }, {
        small: '../../assets/images/venue/v3.jpg',
        medium: '../../assets/images/venue/v3.jpg',
        big: '../../assets/images/venue/v3.jpg'
      }, {
        small: '../../assets/images/venue/v4.jpg',
        medium: '../../assets/images/venue/v4.jpg',
        big: '../../assets/images/venue/v4.jpg'
      }, {
        small: '../../assets/images/venue/v5.jpg',
        medium: '../../assets/images/venue/v5.jpg',
        big: '../../assets/images/venue/v5.jpg'
      }
    ];
  }

  // public carouselTileLoad(evt: any) {
  //   const len = this.carouselTileItems.length;
  // }
}
