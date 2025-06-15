import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'recipes',
        component: RecipesComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
];
