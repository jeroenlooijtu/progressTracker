import { Injectable } from '@angular/core';

import { Exercise } from "./Exercise"
import { EXERSICES } from './mock-exercises';

import { Observable, of } from 'rxjs';
import { NotesService } from './notes.service';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private notesService: NotesService) { }

  getExercises(): Observable<Exercise[]> {
    const exercises = of(EXERSICES);
    this.notesService.add('ExerciseService: fetched exercises');
    return exercises;
  }

  getExercise(id: number): Observable<Exercise> {
    const exercise = EXERSICES.find(e => e.id === id)!;
    this.notesService.add(`ExerciseService: fetche exercise with id: ${id}`);
    return of(exercise);
  }
}
