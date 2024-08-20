import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'https://localhost:7121/api/recipes'; // Ensure this points to your API endpoint

  constructor(private http: HttpClient) { }

  // Accepts FormData instead of raw recipe data
  createNewRecipe(recipeData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, recipeData);  // Sending FormData without setting 'Content-Type'
  }

  // Method to fetch all recipes
  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Get all recipes
  }

  // Delete a recipe by ID
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateRecipe(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/recipes/${id}`, formData);
  }


}
