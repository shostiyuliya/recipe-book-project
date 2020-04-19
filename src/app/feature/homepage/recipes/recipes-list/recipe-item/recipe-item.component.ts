import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
// TODO parentheses should have a space. Remove unused constructor and init
export class RecipeItemComponent implements OnInit{
  @Input() recipe: RecipeModel;

  constructor() {}

  ngOnInit(): void {
  }
}
