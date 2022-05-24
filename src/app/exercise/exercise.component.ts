import { Component, OnInit } from '@angular/core';
import { Exercise } from '../Exercise';
import { EXERSICES } from '../mock-exercises';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exercise: Exercise = {
    id: 1,
    name: 'benchpress',
    musclegroups: ['chest', 'triceps', 'shoulders']
  };
  exercises = EXERSICES;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  selectedExercise?: Exercise;
  onSelect(exercise : Exercise){
    this.selectedExercise = exercise;
  }

}
