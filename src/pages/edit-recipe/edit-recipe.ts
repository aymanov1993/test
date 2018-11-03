import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipe';
import { Ingredient } from '../../models/ingredient';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  recipreForm: FormGroup
  recipe: Recipe
  index: number
  constructor(private navParam: NavParams, private actionSheetController: ActionSheetController, private alertCtrl: AlertController, private toastCtrl: ToastController, private recipeService: RecipesService, private navCtrl: NavController) { }
  mode = 'New'
  options = ['e', 'm', 'd']
  ngOnInit() {
    this.mode = this.navParam.get('mode')
    if (this.mode == 'Edit') {
      this.recipe = this.navParam.get('recipe')
      this.index = this.navParam.get('index')
    }
    this.initForm();
  }

  onSubmit() {
    const value = this.recipreForm.value
    let ingredients = []
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(item => {
        return { name: item, mount: 1 }
      })
    }
    if (this.mode == 'Edit') {
      this.recipeService.updateRecipe(this.index, value.title, value.desc, value.diff, ingredients)
    } else {
      this.recipeService.addRecipe(value.title, value.desc, value.diff, ingredients)
    }
    this.recipreForm.reset()
    this.navCtrl.popToRoot()
  }

  showManageIngredient() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do ?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.creatNewIngredient()
          }
        },
        {
          text: 'Remove All',
          role: 'destructive',
          handler: () => {
            const formArray: FormArray = <FormArray>this.recipreForm.get('ingredients')
            const len = formArray.length
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                formArray.removeAt(i)
              }
              this.toastCtrl.create({
                message: `${len} item(s) removed`,
                duration: 1500,
                position: 'bottom',
              }).present()
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ],
    })
    actionSheet.present()
  }

  private creatNewIngredient() {
    const alert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              this.toastCtrl.create({
                message: 'Name shouldn\'t be empty!',
                duration: 1500,
                position: 'bottom',
              }).present()
              return
            }
            (<FormArray>this.recipreForm.get('ingredients')).push(new FormControl(data.name, Validators.required))
            this.toastCtrl.create({
              message: `${data.name} item added`,
              duration: 1500,
              position: 'bottom',
            }).present()
          }
        }
      ]
    })
    alert.present()
  }

  initForm() {
    let title = ''
    let desc = ''
    let diff = 'm'
    let ingredients = []

    if (this.mode == 'Edit') {
      title = this.recipe.title
      desc = this.recipe.desc
      diff = this.recipe.diff
      for (let ing of this.recipe.ingredient) {
        ingredients.push(new FormControl(ing.name, Validators.required))
      }
    }

    this.recipreForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'diff': new FormControl(diff, Validators.required),
      'ingredients': new FormArray(ingredients)
    })
  }

}
