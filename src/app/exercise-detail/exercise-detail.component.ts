import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../Exercise';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})


export class ExerciseDetailComponent implements OnInit {
  @Input() exercise?: Exercise;
  constructor() { }

  ngOnInit(): void {
  }

}
