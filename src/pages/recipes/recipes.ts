import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipePage } from '../recipe/recipe';
import { RecipeService } from '../../services/recipe.services';
import { Recipe } from '../../models/recipe.model';
/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-recipes',
 	templateUrl: 'recipes.html',
 })
 export class RecipesPage implements OnInit {

 	editRecipe = EditRecipePage;
 	recipePage = RecipePage

 	recipes: Recipe[] = [];
 	
 	constructor(public navCtrl: NavController, public navParams: NavParams, private recipeService : RecipeService) {
 	}

 	ionViewWillEnter() {
 		this.recipes = this.recipeService.getRecipe();
 	}


 	ngOnInit() {

 	}
 }
