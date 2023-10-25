import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Item } from './types';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../model/category';
@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss'],
})
export class CategorySearchComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() selectedItems: string[] = [];
  @Input() selectedCategory: Category[] = [];
  @Input() title = 'Select Items';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<Category[]>();

  workingSelectedValues: string[] = [];
  filteredCategories: Category[] = [];
  workingSelectedValuesCate: Category[] = [];

  constructor(private categoriesSvc: CategoriesService) {}
  ngOnInit() {
    this.categoriesSvc.getCategories().subscribe((data) => {
      this.categories = data;
      this.filteredCategories = [...this.categories];
      this.workingSelectedValuesCate = [...this.selectedCategory];
    });
  }

  trackCtegories(index: number, category: Category) {
    return category.id;
  }

  cancelChanges() {
    this.selectionCancel.emit();
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValuesCate);
  }

  searchbarInput(ev) {
    this.filterList(ev.target.value);
  }

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  filterList(searchQuery: string | undefined) {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined) {
      this.filteredCategories = [...this.categories];
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredCategories = this.categories.filter((cate) =>
        cate.name.toLowerCase().includes(normalizedQuery)
      );
    }
  }

  isChecked(id: number) {
    return this.workingSelectedValuesCate.find(
      (item: Category) => item.id === id
    );
  }
  finOneCategory(id: number) {
    return this.categories.find((item: Category) => item.id === id);
  }

  checkboxChange(ev) {
    const { checked, value } = ev.detail;

    if (checked) {
      const category = this.finOneCategory(value);

      if (
        !this.workingSelectedValuesCate.some((item) => item.id === category.id)
      ) {
        this.workingSelectedValuesCate = [
          ...this.workingSelectedValuesCate,
          category,
        ];
      }
    } else {
      this.workingSelectedValuesCate = this.workingSelectedValuesCate.filter(
        (item: Category) => item.id !== value
      );
    }
  }
}
