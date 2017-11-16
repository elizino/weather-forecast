import { Component, OnInit } from '@angular/core';
import { OpenWeatherApiService } from '../../services/open-weather-api.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  zipForm: FormGroup;

  constructor( private weatherApiSvc : OpenWeatherApiService ) { }

  ngOnInit() {
    this.formGroup();
  }
  formGroup(){
    this.zipForm = new FormGroup ({
      'zipcode': new FormControl('',[Validators.pattern('^[0-9]{5}(\-[0-9]{5})?$')]),
    });
  }
  get zipcode() {
    return this.zipForm.get('zipcode');
  }

  searchLocation(evt, zipcode: string){
    evt.target.value = '';
    this.weatherApiSvc.findLocation(zipcode);
  }


}
