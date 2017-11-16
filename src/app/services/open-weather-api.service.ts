import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import "rxjs/add/observable/throw";


@Injectable()
export class OpenWeatherApiService {

  static API_URL = 'http://api.openweathermap.org/data/2.5';
  static API_KEY = '331aba6c2e2277248986e363af419be9';
  static ICON_SRC = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  
  private weatherinfo = [];
  locStorage: string[] = [];


  constructor(private http: HttpClient) {
    let locString = localStorage.getItem('cities');
      if (locString){
        this.locStorage = JSON.parse(locString);
      }
    }

  storeWeatherInfo(zipcode: string): void {
    this.http.get(`${OpenWeatherApiService.API_URL}/weather?zip=${zipcode},us&units=imperial&APPID=${OpenWeatherApiService.API_KEY}`)
      .subscribe(data => {
        this.weatherinfo.length = 0;
        this.weatherinfo.push({zip: zipcode, data: data});
     },
     (error) => this.handleError(error)
     );
  }

  findLocation(zipcode: string){
    this.locStorage.push(zipcode);
    localStorage.setItem('cities', JSON.stringify(this.locStorage));
    this.storeWeatherInfo(zipcode);
  }

  getWeatherInfo(): any[] {
    return this.weatherinfo;
  }

  getForcastrImg(id){
    if (id >= 200 && id <= 232)
      return OpenWeatherApiService.ICON_SRC + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return OpenWeatherApiService.ICON_SRC + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return OpenWeatherApiService.ICON_SRC+ "art_snow.png";
    else if (id >= 801 && id <= 804)
      return OpenWeatherApiService.ICON_SRC + "art_clouds.png";
    else if (id === 741 || id === 761)
      return OpenWeatherApiService.ICON_SRC+ "art_fog.png";
    else
      return OpenWeatherApiService.ICON_SRC + "art_clear.png";
  }

  private handleError(error: any) {
     console.log(error.message);
     this.weatherinfo.push({data:{ name: "Sorry, try to enter another zipcode :" }});
     return Observable.throw("Server Error");
  }

}
