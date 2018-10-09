import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipesPage } from '../recipes/recipes';
import { ShoppingListPage } from '../shopping-list/shopping-list';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
 	selector: 'page-tabs',
 	templateUrl: 'tabs.html',
 })
 export class TabsPage {

 	slPage = ShoppingListPage;
 	recipesPage = RecipesPage;

 	constructor(public navCtrl: NavController, public navParams: NavParams) {
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad TabsPage');
 	}

 }
