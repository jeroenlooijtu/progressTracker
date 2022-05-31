import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../Exercise';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(exercises => this.exercises = exercises.slice(1,5))
  }

}
