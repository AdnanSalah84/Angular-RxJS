import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

//import { Subscription } from "rxjs";

import { Product } from "./product";
import { ProductService } from "./product.service";
import { Observable, of, EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";

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

  //products: Product[] = [];
  //products$: Observable<Product[]>;
  products$ = this.productService.products$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  //sub: Subscription;

  constructor(private productService: ProductService) {}

  // ngOnInit(): void {
  //   // this.sub = this.productService.getProducts()
  //   //   .subscribe(
  //   //     products => this.products = products,
  //   //     error => this.errorMessage = error
  //   //   );

  //   this.products$ = this.productService.getProducts().pipe(
  //     catchError(err => {
  //       this.errorMessage = err;
  //       return EMPTY;
  //     })
  //   );
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onAdd(): void {
    console.log("Not yet implemented");
  }

  onSelected(categoryId: string): void {
    console.log("Not yet implemented");
  }
}
