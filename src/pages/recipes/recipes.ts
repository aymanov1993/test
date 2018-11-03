import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipe';
import { RecipePage } from '../recipe/recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes : Recipe[] = []

  ionViewWillEnter(){
    this.recipes = this.recipesService.getRecipes()
  }

  constructor(private navCtrl : NavController, private recipesService : RecipesService){}
  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode:'New'})
  }

  onClickrecipe(recipe:Recipe, index:number){
    this.navCtrl.push(RecipePage, {recipe, index})
  }
}
