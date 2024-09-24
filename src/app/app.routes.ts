import { Routes } from '@angular/router';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';


export const routes: Routes = [
    {   path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: OrderPageComponent
    },
    {
        path: "admin",
        component: KitchenComponent
    }
];
