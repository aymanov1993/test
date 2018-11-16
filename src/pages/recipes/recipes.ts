import { AuthService } from './../../services/auth';
import { SLOptionsPage } from './../sl-options/sl-options';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
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

  constructor(private navCtrl : NavController, private recipesService : RecipesService, private popoverCtrl : PopoverController, private loadingCtrl : LoadingController, private alertCtrl : AlertController, private authService : AuthService){}
  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode:'New'})
  }

  onClickrecipe(recipe:Recipe, index:number){
    this.navCtrl.push(RecipePage, {recipe, index})
  }

  onShowOptions(event : MouseEvent){
    const popover = this.popoverCtrl.create(SLOptionsPage)
    popover.present({ev : event})
    popover.onDidDismiss(data =>{
      if(!data){
        return
      }
      const loading = this.loadingCtrl.create({
        content : 'Please wait ...'
      })
      loading.present()
      if(data.action == 'load'){
        this.authService.getActiveUser().getIdToken()
        .then((token : string)=>{
          this.recipesService.fetchList(token)
          .subscribe(
            (list : Recipe[])=>{
              if(list){
                this.recipes = list
              }else{
                this.recipes = []
              }
              loading.dismiss()
            },
            error => {
              loading.dismiss()
              this.errorHandle(error)
            }
          )
        })
      }else{
        this.authService.getActiveUser().getIdToken()
        .then((token:string)=>{
          this.recipesService.storeList(token)
          .subscribe(
            ()=>{
              loading.dismiss()
            },
            error =>{
              loading.dismiss()
              this.errorHandle(error)
            }
          )
        })
      }
    })
  }
  private errorHandle(error){
    const alert = this.alertCtrl.create({
      title : 'An error occurred!',
      message : error.json().error,
      buttons : ["ok"]
    })
    alert.present()
  }
}
