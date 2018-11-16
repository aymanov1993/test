import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipe';
import { shoppingListService } from '../../services/shopping-list';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe : Recipe
  index : number
  constructor(public navCtrl: NavController, public navParams: NavParams,private recipeService :RecipesService, private slService : shoppingListService, private toastCtrl : ToastController) {
  }

  ngOnInit(){
    this.recipe = this.navParams.get('recipe')
    this.index = this.navParams.get('index')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipePage, {mode:'Edit', recipe:this.recipe, index : this.index})
  }

  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.index)
    this.navCtrl.popToRoot()
  }

  addIngredientsToList(){
    this.slService.addItems(this.recipe.ingredient)
    this.toastCtrl.create({
      message : 'Items are added to shopping list!',
      duration : 1500,
    }).present()
  }

}
