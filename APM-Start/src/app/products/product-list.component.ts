import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

//import { Subscription } from "rxjs";

import { Product } from "./product";
import { ProductService } from "./product.service";
import {
  Observable,
  of,
  EMPTY,
  Subject,
  combineLatest,
  BehaviorSubject
} from "rxjs";
import { catchError, map, startWith } from "rxjs/operators";
import { ProductCategoryService } from "../product-categories/product-category.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
//, OnDestroy
export class ProductListComponent {
  pageTitle = "Product List";
  errorMessage = "";
  categories;
  selectedCategoryId = 1;
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  //products: Product[] = [];
  //products$: Observable<Product[]>;
  // products$ = this.productService.products$.pipe(
  //   catchError(err => {
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  // );

  //sub: Subscription;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  /*products$ = this.productService.productWithCategory$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );*/

  products$ = combineLatest([
    this.productService.productWithCategory$,
    this.categorySelectedAction$
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter(product =>
        selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )
    ),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  /*productsSimpleFilter$ = this.productService.productWithCategory$.pipe(
    map(products =>
      products.filter(product =>
        this.selectedCategoryId
          ? product.categoryId === this.selectedCategoryId
          : true
      )
    )
  );*/

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  /*ngOnInit(): void {
    // this.sub = this.productService.getProducts()
    //   .subscribe(
    //     products => this.products = products,
    //     error => this.errorMessage = error
    //   );

    this.products$ = this.productService.getProducts().pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }*/

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onAdd(): void {
    console.log("Not yet implemented");
  }

  onSelected(categoryId: string): void {
    //this.selectedCategoryId = +categoryId;
    this.categorySelectedSubject.next(+categoryId);
  }
}
