import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

export class RecipesService{
    recipes : Recipe[] = []

    addRecipe(title:string, desc:string, diff:string, ingredients : Ingredient[]){
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

}