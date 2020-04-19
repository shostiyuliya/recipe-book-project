import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipes/services/recipe.service';
import { HttpClient } from '@angular/common/http';
import { DropdownDataModel } from './models/dropdown-data.model';
import { map } from 'rxjs/operators';
import { DropdownCategoryResponseModel } from './models/dropdown-category-response.model';
import { DropdownAreaResponseModel } from './models/dropdown-area-response.model';
import { recipesApiUrls } from '../consts/recipes-api-urls';
import { searchTypes } from '../consts/search-types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;

  dropdownCategoryData: DropdownDataModel;

  dropdownAreaData: DropdownDataModel;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {

    // TODO do it on variable initializing
    this.searchForm = fb.group({
      name: '',
      area: '',
      category: ''
    });
  }

  ngOnInit(): void {
    this.fetchDropdownData();
  }

  onSearch() {
    this.router.navigate(
      ['/home', 'list'],
      {queryParams:
          {
            areaValue: this.searchForm.get('area').value,
            categoryValue: this.searchForm.get('category').value,
            nameValue: this.searchForm.get('name').value
          }
      }
    );
  }

  private fetchDropdownData() {
    // TODO add unsubscribe
    this.http.get<DropdownCategoryResponseModel>(recipesApiUrls.categoryList)
      .pipe(
        map((responseData: DropdownCategoryResponseModel) => {
          return {
            label: searchTypes.category,
            dropdownList: responseData.meals.map(item => item.strCategory)
          } as DropdownDataModel;
        })
      )
      .subscribe(data => {
        this.dropdownCategoryData = data;
        this.dropdownCategoryData.dropdownList.unshift(null);
      });
    this.http.get<DropdownAreaResponseModel>(recipesApiUrls.areaList)
      .pipe(
        map((responseData: DropdownAreaResponseModel) => {
          return {
            label: searchTypes.area,
            dropdownList: responseData.meals.map(item => item.strArea)
          } as DropdownDataModel;
        })
      )
      .subscribe((data: DropdownDataModel) => {
        this.dropdownAreaData = data;
        this.dropdownAreaData.dropdownList.unshift(null);
      });
  }
}
