import { Injectable } from '@angular/core';

import { Exercise } from "./Exercise"
import { EXERSICES } from './mock-exercises';

import { Observable, of } from 'rxjs';
import { NotesService } from './notes.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exerciseUrl = 'http://localhost:3000/api/exercise'

  constructor(
    private http: HttpClient,
    private notesService: NotesService) { }

  private log(message: string){
    this.notesService.add(`ExerciseService: ${message}`)
  }

  getExercises(): Observable<JSON> {
    this.log("getting exercises from api")
    let exercises = this.http.get<JSON>(this.exerciseUrl)
      .pipe(
        catchError(this.handleError<JSON>('this.getExercises'))
      );
    this.log("yes")
    return exercises;
  }

  getExercise(id: number): Observable<Exercise> {
    const exercise = EXERSICES.find(e => e.id === id)!;
    this.notesService.add(`ExerciseService: fetche exercise with id: ${id}`);
    return of(exercise);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
        console.error(error);

        this.log(`${operation} failed: ${error.message}`)
        return of(result as T)
    }
  }
}
