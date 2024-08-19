import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from './services/recipe.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ReactiveFormsModule, CommonModule, TableModule, DialogModule, ButtonModule],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  recipeForm!: FormGroup;
  selectedFile!: File | null;
  recipes: any[] = [];

  constructor(private recipeService: RecipeService, private messageService: MessageService) {
    this.recipeForm = new FormGroup({
      dishName: new FormControl('', Validators.required),
      dishType: new FormControl('', Validators.required),
      ingredients: new FormControl('', Validators.required),
      preparation: new FormControl('', Validators.required),
    });
  }

  displayDialog: boolean = false;

  ngOnInit(): void {
    this.loadAllRecipes();
  }


  loadAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data) => {
        this.recipes = data;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load recipes.' });
      }
    );
  }

  // Method to handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file ? file : null;
  }

  // Submitting the form
  onSubmit(): void {
    if (!this.selectedFile) {
      this.messageService.add({ severity: 'warning', summary: 'Pogreška', detail: 'Fotografija jela je obavezna.' });
      return;
    }

    const formData = new FormData();
    formData.append('DishName', this.recipeForm.get('dishName')?.value);
    formData.append('DishType', this.recipeForm.get('dishType')?.value);
    formData.append('Ingredients', this.recipeForm.get('ingredients')?.value);
    formData.append('Preparation', this.recipeForm.get('preparation')?.value);
    formData.append('Image', this.selectedFile);

    this.recipeService.createNewRecipe(formData).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Uspjeh', detail: 'Uspješno objavljen recept.' });
        this.loadAllRecipes();  // Reload recipes after successful submission
      },
      (error) => {
        this.messageService.add({ severity: 'warning', summary: 'Pogreška', detail: 'Greška prilikom objave recepta.' });
      }
    );
  }

  // Handle edit action
  onEditRecipe(recipe: any): void {
    // Prepopulate the form with the selected recipe data
    this.recipeForm.setValue({
      dishName: recipe.dishName,
      dishType: recipe.dishType,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
    });
    // Additional logic to manage editing can be added here
    this.messageService.add({ severity: 'info', summary: 'Edit', detail: `Editing recipe: ${recipe.dishName}` });
  }

  // Handle delete action
  onDeleteRecipe(id: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Recipe successfully deleted.' });
          this.loadAllRecipes();  // Reload recipes after deletion
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete recipe.' });
        }
      );
    }
  }
}
