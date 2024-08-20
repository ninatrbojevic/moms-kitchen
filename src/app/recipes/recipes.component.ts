import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { DialogModule } from 'primeng/dialog';
import { RecipeService } from '../dashboard/services/recipe.service';


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})

export class RecipesComponent implements OnInit {

  recipes: any[] = [];  // Store fetched recipes

  isModalOpen = false;  // For modal control
  modalRecipe: any = {};  // To hold recipe details for the modal

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadAllRecipes();  // Load recipes on component initialization
  }

  // Load all recipes from the service
  loadAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data) => {
        console.log('Fetched Recipes:', data);  // Log the fetched data
        this.recipes = data;  // Bind fetched data to the recipes array
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
