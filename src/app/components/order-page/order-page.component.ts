import { Component, Inject, OnInit } from '@angular/core';
import { APIService } from "../../api.service";
import { RestoCategorie } from "../../interfaces";
import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from "@angular/common";
import { FilterByCategoryIDPipe } from "../../pipes/filterByCategoryID/filter-by-category-id.pipe";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms"
import { IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonRow } from '@ionic/angular/standalone';


@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [NgFor, UpperCasePipe, FilterByCategoryIDPipe, AsyncPipe, NgIf, IonList, IonLabel, IonItem, IonGrid, IonCol, IonRow, IonCard, IonContent, IonCardHeader],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  title = 'Bac a Sable Angular App';
  categories$: Promise<RestoCategorie[]>;
  selectedCategoryId: string = '01489fc9-0be3-424e-a276-33e393062072'
  //log = console.log("yooo : ", this.categories$)

  //Creation du tableau qui va contenir touttes les commandes
  orderForm = new FormArray([] as any, Validators.compose([Validators.minLength(2)]))

  constructor(
    private readonly _service: APIService
  ) {
    this.categories$ = this._service.getRecipes()
  }

  //creation method qui va conserver tout le id selectionner
  addToForm(id: string, price: number) {

    const itemExist = this.orderForm.value.findIndex((element: { id: string }) => element.id === id);

    if (itemExist >= 0) {
      let quantity = this.orderForm.at(itemExist).get("quantity")?.value || 1;
      this.orderForm.at(itemExist).get("quantity")?.patchValue(quantity + 1)
    }
    else {
      const itemctrl = new FormGroup({
        quantity: new FormControl(1),
        id: new FormControl(id),
        price: new FormControl(price)
      })
      this.orderForm.push(itemctrl)
    }



    console.log(this.orderForm.value, this.orderForm.valid)

  }
  deleteForm(uuid: string) {
    const indexitemToDelete = this.orderForm.value.findIndex((element: {id : string}) => element.id === uuid)
    //on vient voir si l element selectionner fais partit de OrderForm - si l indice est -1 alors il ne fait par partit de order form
    console.log(indexitemToDelete); 
    if (indexitemToDelete > -1) {
      //dans ce cas l element exist
      const quantity = this.orderForm.at(indexitemToDelete).get("quantity")?.value
      if (quantity > 1) {
        this.orderForm.at(indexitemToDelete).get("quantity")?.patchValue(quantity - 1)
        //console.log("delete else :", this.orderForm.at(indexitemToDelete).get("quantity")?.value);
      } else {
        this.orderForm.removeAt(indexitemToDelete)
      }
      console.log(this.orderForm.value)
    }

  }
}

