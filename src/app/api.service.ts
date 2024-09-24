import { Injectable } from "@angular/core";
import { APIResponse, RestoCategorie } from "./interfaces";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class APIService{

    constructor(
        private readonly _http: HttpClient
    ) {}

    async getRecipes() {
        const url = "./resto-data.json";
        const response = this._http.get<APIResponse>(url);
        const result = await firstValueFrom(response);
        console.log("result . data est :",result.data)
        return result.data;
    }
}