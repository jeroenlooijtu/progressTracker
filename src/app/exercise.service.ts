import { Injectable } from '@angular/core';

import { Exercise } from "./Exercise"
import { EXERSICES } from './mock-exercises';

import { Observable, of } from 'rxjs';
import { NotesService } from './notes.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import * as e from 'express';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exerciseUrl = 'http://localhost:3000/api/exercise'
  private exerciseByIdUrl = 'http://localhost:3000/api/exercise'

  constructor(
    private http: HttpClient,
    private notesService: NotesService) { }

  private log(message: string){
    this.notesService.add(`ExerciseService: ${message}`)
  }

  getExercises(): Observable<Exercise[]> {
    this.log("getting exercises from api")
    let exercises = this.http.get<Exercise[]>(this.exerciseUrl)
      .pipe(
        catchError(this.handleError<Exercise[]>('this.getExercises'))
      );
    // this.log("yes")
    // let returnObservalble: Observable<Exercise[]> = of(this.jsonHandler(exercises))
    // this.log("The weird observable thing is also doing okayish")
    // let aaaahhhhh: Exercise[] = [];
    // returnObservalble.subscribe(
    //   e => aaaahhhhh = e
    // );
    return exercises;
  }

  getExercise(id: number): Observable<Exercise> {
    const url = this.exerciseByIdUrl.concat(`/${id}`)
    const exercise = this.http.get<Exercise>(url)
    .pipe(
      catchError(this.handleError<Exercise>('this.getExercise'))
    )
    this.notesService.add(`ExerciseService: fetche exercise with id: ${id}`);
    return exercise;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
        console.error(error);

        this.log(`${operation} failed: ${error.message}`)
        return of(result as T)
    }
  }

  private jsonHandler (json: Observable<JSON>): Exercise[] {
    let toParse = undefined;
    json.forEach(
      e => toParse = e
    )
    this.log("Jsonhandler called")
    this.log(JSON.stringify(toParse))
    let exerciseArray: Exercise[] = JSON.parse(JSON.stringify(json));
    this.log(exerciseArray.toString())
    this.log("The making of the array works at least")
    return exerciseArray;
  }
}
