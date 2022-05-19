import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';

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
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
