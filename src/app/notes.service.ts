import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: string[] = []

  add(note: string){
    this.notes.push(note);
  }

  clear() {
    this.notes = [];
  }
}
