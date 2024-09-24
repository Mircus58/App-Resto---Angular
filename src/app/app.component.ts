import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APIService } from './api.service';
import { RestoCategorie } from './interfaces';
import {OrderPageComponent} from './components/order-page/order-page.component';
import { NgFor, NgStyle, SlicePipe, UpperCasePipe } from '@angular/common';
import '@khmyznikov/pwa-install';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderPageComponent, NgStyle, NgFor, SlicePipe, UpperCasePipe, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent  {
  title = 'appResto';
  categories!: RestoCategorie[];
//ancienne method pour fetch
//   async ngOnInit(): Promise<void> {
//     const value = inject(APIService).getRecipes();
//     console.log(value);
//     this.categories = value;
//   }
 }
