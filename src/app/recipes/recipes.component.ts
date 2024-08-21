import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { RecipeService } from '../dashboard/services/recipe.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // Separate arrays to store recipes by dish type
  starters: any[] = [];
  meals: any[] = [];
  salads: any[] = [];
  deserts: any[] = [];

  isModalOpen = false;  // For modal control
  modalRecipe: any = {};  // To hold recipe details for the modal

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadAllRecipes();  // Load recipes on component initialization
  }

  // Load all recipes from the service and sort by dish type
  loadAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data) => {
        console.log('Fetched Recipes:', data);  // Log the fetched data

        // Clear current arrays
        this.starters = [];
        this.meals = [];
        this.salads = [];
        this.deserts = [];

        // Categorize recipes based on dish type
        data.forEach(recipe => {
          switch(recipe.dishType) {
            case 'Zalogajčići':
              this.starters.push(recipe);
              break;
            case 'Obroci':
              this.meals.push(recipe);
              break;
            case 'Salate':
              this.salads.push(recipe);
              break;
            case 'Slastice':
              this.deserts.push(recipe);
              break;
          }
        });
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  // Open the modal with the selected recipe details
  openModal(recipe: any): void {
    this.modalRecipe = recipe;
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
  }
}
