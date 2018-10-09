import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe.services';
import { ShoppingListService } from '../../services/shoppinglist.services';
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
export class RecipePage implements OnInit{

	recipe: Recipe;
	editRecipePage = EditRecipePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipeService: RecipeService, private slService: ShoppingListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  ngOnInit() {
  	this.recipe = this.navParams.data;
  }

  onEditRecipe() {
  	this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe});
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.recipe);
    this.navCtrl.popToRoot();
  }

  onAddIngredients() {
    this.slService.addIngredients(this.recipe.ingredients);
  }
}
