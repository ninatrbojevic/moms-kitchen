import { Component } from '@angular/core';


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent{
  isModalOpen = false;
  modalRecipe = {
    name: '',
    type: '',
    ingredients: '',
    preparation: '',
    image: ''
  };
  

  // Open the modal with the specific recipe details
  openModal(name: string, type: string, ingredients: string, image: string) {
    this.modalRecipe = {
      name,
      type,
      ingredients,
      preparation: 'Here goes the preparation steps for the recipe.', // You can add preparation details here
      image
    };
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }
}
