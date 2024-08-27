import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../dashboard/services/recipe.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  favoriteRecipes: any[] = [];
  isModalOpen = false;  // For modal control
  modalRecipe: any = {};  // To hold recipe details for the modal

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    const ids = [18, 19, 17];
    ids.forEach(id => {
      this.recipeService.getRecipeById(id).subscribe(recipe => {
        this.favoriteRecipes.push(recipe);
      });
    });
  }

  openModal(recipe: any): void {
    this.modalRecipe = recipe;
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
  }
}
