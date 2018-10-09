import { Ingredient } from '../models/ingredient.model';

export class ShoppingListService {

	private ingredients: Ingredient[] = [];

	addIngredient(name: string, amount: number) {
		this.ingredients.push(new Ingredient(name, amount));
		console.log(this.ingredients);
	}

	addIngredients(items: Ingredient[]) {
		//pushing each item in items arrary to ingredients array
		this.ingredients.push(...items);

	}

	getIngredients(){
		//returens copy of array
		return this.ingredients.slice();
	}

	removeIngredient(ingredient: Ingredient) {
		const position = this.ingredients.indexOf(ingredient);
		this.ingredients.splice(position, 1);
	}
}