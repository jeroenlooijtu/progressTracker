import { Component, OnInit } from '@angular/core';
import { Exercise } from '../Exercise';
import { ExerciseService } from '../exercise.service';
import { NotesService } from '../notes.service';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
  selectedExercise?: Exercise;
  constructor(private exerciseService: ExerciseService, private notesService: NotesService) { 
    
  }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void{
    this.exerciseService.getExercises()
      .subscribe(exercises => this.exercises = exercises);
  }

  onSelect(exercise : Exercise){
    this.selectedExercise = exercise;
    this.notesService.add(`ExerciseComponent: Selected Exercise id=${exercise.id}`);
  }

}
