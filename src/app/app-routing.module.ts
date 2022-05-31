import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from './exercise/exercise.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
const routes: Routes = [
  {path: 'exercises', component: ExerciseComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: ExerciseDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
