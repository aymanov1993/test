import { Http, Response } from '@angular/http';
import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { AuthService } from './auth';

@Injectable()
export class RecipesService{
    constructor(private http : Http, private authService : AuthService){}
    recipes : Recipe[] = []

    addRecipe(title:string, desc:string, diff:string, ingredients : Ingredient[]){
        console.log(title)
        this.recipes.push(new Recipe(title, desc, diff, ingredients))
        console.log(this.recipes)
    }

    getRecipes(){
        return this.recipes.slice()
    }

    updateRecipe(index:number, title:string, desc:string, diff:string, ingredients: Ingredient[]){
        this.recipes[index] = new Recipe(title, desc, diff, ingredients)
    }

    removeRecipe(index:number){
        this.recipes.splice(index, 1)
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid
        return this.http.put('https://recipebook-ea271.firebaseio.com/' + userId + '/recipe.json?auth='+token, this.recipes)
            .map((response: Response) => {
                return response.json()
            })
    }

    fetchList(token : string){
        const userId = this.authService.getActiveUser().uid
        return this.http.get('https://recipebook-ea271.firebaseio.com/' + userId + '/recipe.json?auth='+token)
        .map((response : Response)=>{
            const recipes : Recipe[] = response.json() ? response.json() : []
            for(let item of recipes){
                if(!item.hasOwnProperty('ingredients')){
                    item.ingredient = []
                }
            }
            return recipes
        })
        .do(data => {
            this.recipes = data
        })
    }

}