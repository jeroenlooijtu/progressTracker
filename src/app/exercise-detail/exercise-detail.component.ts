import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../Exercise';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})


export class ExerciseDetailComponent implements OnInit {
  @Input() exercise?: Exercise;
  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getExercise();
  }

  getExercise(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.exerciseService.getExercise(id)
      .subscribe(exercise => this.exercise = exercise);

  }
  goBack(): void{
    this.location.back();
  }

}
