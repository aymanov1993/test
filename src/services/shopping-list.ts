import { Ingredient } from '../models/ingredient'
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth';
import 'rxjs/Rx'

@Injectable()
export class shoppingListService {

    constructor(private http: Http, private authService: AuthService) { }

    private ingredients: Ingredient[] = [];

    addItem(name: string, mount: number) {
        this.ingredients.push(new Ingredient(name, mount))
    }
    addItems(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
    }
    getItems() {
        return this.ingredients.slice()
    }
    removeItem(index: number) {
        this.ingredients.splice(index, 1)
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid
        return this.http.put('https://recipebook-ea271.firebaseio.com/' + userId + '/shopping-list.json?auth='+token, this.ingredients)
            .map((response: Response) => {
                return response.json()
            })
    }

    fetchList(token : string){
        const userId = this.authService.getActiveUser().uid
        return this.http.get('https://recipebook-ea271.firebaseio.com/' + userId + '/shopping-list.json?auth='+token)
        .map((response : Response)=>{
            return response.json()
        })
        .do(data => {
            this.ingredients = data
        })
    }
}