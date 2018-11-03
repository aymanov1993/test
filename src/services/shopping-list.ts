import {Ingredient} from '../models/ingredient'

export class shoppingListService {

    private ingredients : Ingredient[] = [];

    addItem(name:string, mount:number){
        this.ingredients.push(new Ingredient(name, mount))
    }
    addItems(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients)
    }
    getItems(){
        return this.ingredients.slice()
    }
    removeItem(index:number){
        this.ingredients.splice(index, 1)
    }
}