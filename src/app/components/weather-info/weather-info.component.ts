import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Observable } from 'rxjs';
import { OpenWeatherApiService } from '../../services/open-weather-api.service'
import { WeatherResponse } from './../../interfaces/weather-response';

@Component({
  selector: 'weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {
  private todayForecast = [];
  zipcode = '';
  responseData: WeatherResponse;

  constructor(private forecastService: OpenWeatherApiService ) { }

  ngOnInit() {}

  getForecast() {
    return this.forecastService.getWeatherInfo();
  }

}
