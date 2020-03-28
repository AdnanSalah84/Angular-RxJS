import { Component, ChangeDetectionStrategy } from "@angular/core";

import { ProductService } from "../product.service";
import { catchError, map, filter } from "rxjs/operators";
import { EMPTY, Subject, combineLatest } from "rxjs";
import { Product } from "../product";

@Component({
  selector: "pm-product-detail",
  templateUrl: "./product-detail.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  //pageTitle = "Product Detail";
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  product;

  constructor(private productService: ProductService) {}

  product$ = this.productService.selectedProduct$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  pageTitle$ = this.product$.pipe(
    map((p: Product) => (p ? `Poduct Detail for: ${p.productName}` : null))
  );

  productSuppliers$ = this.productService.selectedProductSuppliers$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  // Combine All Stream
  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$
  ]).pipe(
    filter(([product]) => Boolean(product)),
    map(([product, productSuppliers, pageTitle]) => ({
      product,
      productSuppliers,
      pageTitle
    }))
  );
}
