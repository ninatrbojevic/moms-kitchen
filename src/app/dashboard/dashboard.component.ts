import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from './services/recipe.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ReactiveFormsModule, CommonModule, TableModule, DialogModule, ButtonModule, ToastModule],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  recipeForm!: FormGroup;
  selectedFile!: File | null;
  recipes: any[] = [];
  displayDialog: boolean = false;
  selectedRecipeId: number | null = null;


  constructor(private recipeService: RecipeService, private messageService: MessageService) {
    this.recipeForm = new FormGroup({
      dishName: new FormControl('', Validators.required),
      dishType: new FormControl('', Validators.required),
      ingredients: new FormControl('', Validators.required),
      preparation: new FormControl('', Validators.required),
    });
  }


  ngOnInit(): void {
    this.loadAllRecipes();
  }


  loadAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data) => {
        this.recipes = data;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Pogreška', detail: 'Pogreška prilikom učitavanja recepata.' });
      }
    );
  }

  // Method to handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file ? file : null;
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.messageService.add({ severity: 'warning', summary: 'Pogreška', detail: 'Sva polja su obavezna.' });
      return;
    }

    const formData = new FormData();
    formData.append('DishName', this.recipeForm.get('dishName')?.value);
    formData.append('DishType', this.recipeForm.get('dishType')?.value);
    formData.append('Ingredients', this.recipeForm.get('ingredients')?.value);
    formData.append('Preparation', this.recipeForm.get('preparation')?.value);

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    if (this.selectedRecipeId) {
      // If selectedRecipeId is set, update the existing recipe
      this.recipeService.updateRecipe(this.selectedRecipeId, formData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Uspjeh', detail: 'Recept je uspješno ažuriran.' });
          this.loadAllRecipes();  // Reload recipes after successful update
          this.displayDialog = false;
          this.selectedRecipeId = null;  // Clear the selectedRecipeId
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Pogreška', detail: 'Greška prilikom ažuriranja recepta.' });
        }
      );
    } else {
      // Otherwise, create a new recipe
      this.recipeService.createNewRecipe(formData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Uspjeh', detail: 'Recept je uspješno objavljen.' });
          this.loadAllRecipes();  // Reload recipes after successful submission
          this.displayDialog = false;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Pogreška', detail: 'Greška prilikom objave recepta.' });
        }
      );
    }

    // Reset the form after submission
    this.recipeForm.reset();
    this.selectedFile = null;
  }


  onEditRecipe(recipe: any): void {
    // Track the ID of the recipe being edited
    this.selectedRecipeId = recipe.id;

    // Prepopulate the form with the selected recipe data
    this.recipeForm.setValue({
      dishName: recipe.dishName,
      dishType: recipe.dishType,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
    });

    // Open the dialog
    this.displayDialog = true;

    // Optional: Show a message for editing
    this.messageService.add({ severity: 'info', summary: 'Uređivanje', 
      detail: `Uređivanje recepta: ${recipe.dishName}` });
  }

  // Handle delete action
  onDeleteRecipe(id: number): void {
    if (confirm('Jeste sigurni da želite obrisati ovaj recept?')) {
      this.recipeService.deleteRecipe(id).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Obrisano', detail: 'Recept je uspješno obrisan.' });
          this.loadAllRecipes();  // Reload recipes after deletion
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Pogreška', detail: 'Pogreška pri brisanju recepta.' });
        }
      );
    }
  }

  clearForm(): void {
    this.recipeForm.reset();
  } 
}
