import { Ingredient } from './../../models/ingredient';
import { AuthService } from './../../services/auth';
import { SLOptionsPage } from './../sl-options/sl-options';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { shoppingListService } from '../../services/shopping-list';
import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  sl: Ingredient[];
  constructor(private slService: shoppingListService, private popoverCtrl: PopoverController, private authService: AuthService, private loadingCtrl : LoadingController, private alertCtrl : AlertController) { }
  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.name, form.value.mount);
    form.reset()
    this.loadItems()
  }

  ionViewWillEnter() {
    this.loadItems()
  }
  public loadItems() {
    this.sl = this.slService.getItems();
  }

  onClickItem(index: number) {
    this.slService.removeItem(index)
    this.loadItems()
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(SLOptionsPage)
    popover.present({ ev: event })
    popover.onDidDismiss(data => {
      if(!data){
        return
      }
      const loading = this.loadingCtrl.create({
        content : 'Pleae wait ...'
      })
      loading.present()
      if (data.action == 'load') {
        this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.slService.fetchList(token)
              .subscribe(
                (list : Ingredient[]) => {
                  if(list){
                    this.sl = list
                    loading.dismiss()
                  }else{
                    this.sl = []
                    loading.dismiss()
                  }
                },
                error => {
                  loading.dismiss()
                  this.handleError(error)
                }
              )
          })
      } else {
        this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.slService.storeList(token)
              .subscribe(
                () => {
                  loading.dismiss()
                },
                error => {
                  loading.dismiss()
                  this.handleError(error)
                }
              )
          })
      }
    })
  }

  private handleError(error){
    const alert = this.alertCtrl.create({
      title : 'An error occurred!',
      message : error.json().error,
      buttons : ["ok"]
    })
    alert.present()
  }

}
