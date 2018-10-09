import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../../services/recipe.services';
import { Recipe } from '../../models/recipe.model';

@IonicPage()
@Component({
	selector: 'page-edit-recipe',
	templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

	mode = 'New';
	selectOptions = ['Easy', 'Medium', 'Hard'];
	recipeForm: FormGroup;
	recipe: Recipe;


	constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetController: ActionSheetController, private newAlert: AlertController, private toastController: ToastController, private recipeService: RecipeService) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditRecipePage');
	}

	ngOnInit() {
		this.mode = this.navParams.get('mode');
		console.log(this.mode);

		if (this.mode == 'Edit') {
			this.recipe = this.navParams.get('recipe');
		}
		this.initializeForm();
	}

	private initializeForm() {

		let title = null;
		let description = null;
		let difficulty = 'Medium';
		let ingredients = [];

		if (this.mode == 'Edit') {
			title = this.recipe.title;
			description = this.recipe.description;
			difficulty = this.recipe.difficulty;
			for (let ingredient of this.recipe.ingredients) {
				ingredients.push(new FormControl(ingredient.name, Validators.required))
			}
		}

		this.recipeForm = new FormGroup({
			'title': new FormControl(title, Validators.required),
			'description': new FormControl(description, Validators.required),
			'difficulty': new FormControl(difficulty, Validators.required),
			'ingredients': new FormArray(ingredients)
		});
	}

	onSubmit(){
		console.log(this.recipeForm);
		const value = this.recipeForm.value;
		let ingredients = []
		if (value.ingredients.length > 0 ) {
			ingredients = value.ingredients.map(name => {
				return {name: name, amount: 1}
			});
		}
		if (this.mode == "Edit") {
			this.recipeService.updateRecipe(this.recipe, this.recipe.title, this.recipe.description, this.recipe.difficulty, this.recipe.ingredients);
		} else {
				this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
		}
	
		this.recipeForm.reset();
		this.navCtrl.popToRoot();
	}

	onManageIngredients() {
		const actionSheet = this.actionSheetController.create({
			'title': 'What do you want to do',
			buttons: [
			{
				text: "Add Ingredient",
				handler: () => {
					this.createNewIngredientAlert().present();
				}
			},
			{
				text: "Remove all Ingredients",
				handler: () => {
					const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
					const len = formArray.length;
					if (len > 0 ) {
						while(formArray.length > 0){
							formArray.removeAt(0);
						}
						const toast = this.toastController.create({
							message: 'Ingredients Deleted',
							duration: 1000,
							position: 'bottom'
						});
						toast.present();
					}
				}
			},
			{
				text: "Cancel",
				role: 'cancel',
			}
			]
		});

		actionSheet.present();
	}

	private createNewIngredientAlert() {
		const newIngredientAlert = this.newAlert.create({
			title: 'Add Ingredient',
			inputs: [
			{
				name: 'name',
				placeholder: 'Name'
			},
			],
			buttons: [
			{
				text: 'Add',
				handler: data => {
					if (data.name.trim() =='' || data.name == null) {
						const toast = this.toastController.create({
							message: 'Please enter a valid value',
							duration: 1000,
							position: 'bottom'
						});
						toast.present();
						return;
					}
					(<FormArray>this.recipeForm.get('ingredients')).push(new FormControl((data.name), Validators.required));
						const toast = this.toastController.create({
							message: 'Ingredient Added',
							duration: 1000,
							position: 'bottom'
						});
						toast.present();
				}
			}
			]
		});

		return newIngredientAlert;
	}
}
