import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from './services/recipe.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common'; // Add CommonModule for common directives

@Component({
  selector: 'app-dashboard',
  standalone: true,  // Ensure the component is standalone
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ReactiveFormsModule, CommonModule],  // Import ReactiveFormsModule and CommonModule
  providers: [MessageService],
})
export class DashboardComponent {
  recipeForm!: FormGroup;
  selectedFile!: File | null; 

  constructor(private recipeService: RecipeService, private messageService: MessageService) {
    this.recipeForm = new FormGroup({
      dishName: new FormControl('', Validators.required),
      dishType: new FormControl('', Validators.required),
      ingredients: new FormControl('', Validators.required),
      preparation: new FormControl('', Validators.required),
    });
  }

  // Method to handle file selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file ? file : null;
  }

  // Submitting the form
  onSubmit(): void {
    // Check if a file has been selected
    if (!this.selectedFile) {
      this.messageService.add({ severity: 'warning', summary: 'Pogreška', detail: 'Fotografija jela je obavezna.' });
      return;
    }

    // Creating a FormData object
    const formData = new FormData();
    formData.append('DishName', this.recipeForm.get('dishName')?.value);
    formData.append('DishType', this.recipeForm.get('dishType')?.value);
    formData.append('Ingredients', this.recipeForm.get('ingredients')?.value);
    formData.append('Preparation', this.recipeForm.get('preparation')?.value);
    formData.append('Image', this.selectedFile);  // Append the selected file as 'Image'

    // Submitting the form data
    this.recipeService.createNewRecipe(formData).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Uspjeh', detail: 'Uspješno objavljen recept.' });
      },
      (error) => {
        this.messageService.add({ severity: 'warning', summary: 'Pogreška', detail: 'Greška prilikom objave recepta.' });
      }
    );
  }
}
