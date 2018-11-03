import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { shoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  sl : Ingredient[];
  constructor(private slService : shoppingListService){}
  onAddItem(form:NgForm){
    this.slService.addItem(form.value.name, form.value.mount);
    form.reset()
    this.loadItems()
  }

  ionViewWillEnter(){
    this.loadItems()
  }
  public loadItems(){
    this.sl = this.slService.getItems();
  }

  onClickItem(index:number){
    this.slService.removeItem(index)
    this.loadItems()
  }

}
