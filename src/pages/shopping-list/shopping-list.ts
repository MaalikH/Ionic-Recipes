import { Component, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingListService } from '../../services/shoppinglist.services';
import { Ingredient } from '../../models/ingredient.model';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-shopping-list',
 	templateUrl: 'shopping-list.html',
 })
 export class ShoppingListPage {

 	listItems: Ingredient[] = [];

 	constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListService) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad ShoppingListPage');
 	}

 	ionViewWillEnter() {
 		this.loadItems();
 		//console.log(this.listItems);
 	}

 	onAddItem(form: NgForm) {
 		this.slService.addIngredient(form.value.ingredientName, form.value.ingredientAmount);
 		form.reset();
 		this.loadItems();
 	}

 	onItemDelete(ingredient: Ingredient) {
 		this.slService.removeIngredient(ingredient);
 		this.loadItems();
 	}
 	private loadItems() {
 		this.listItems = this.slService.getIngredients();
 	}


 }
