import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';


export class RecipeService {

	private recipes: Recipe[] = [];

	addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
		this.recipes.push(new Recipe(title, description, difficulty, ingredients));
		console.log(this.recipes);
	}

	getRecipe() {
		return this.recipes.slice();
	}

	updateRecipe(recipe: Recipe, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
		const position= this.recipes.indexOf(recipe);
		this.recipes[position] = new Recipe(title, description, difficulty, ingredients); 
	}

	removeRecipe(recipe: Recipe) {
		const position = this.recipes.indexOf(recipe);
		this.recipes.splice(position);
	}
}