import { Component, ChangeDetectionStrategy } from "@angular/core";

import { Subscription, EMPTY } from "rxjs";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list-alt.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = "Products";
  errorMessage = "";
  selectedProductId;

  // products: Product[] = [];
  // sub: Subscription;

  constructor(private productService: ProductService) {}

  products$ = this.productService.productWithCategory$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  selectedProduct$ = this.productService.selectedProduct$;

  // ngOnInit(): void {
  //   this.sub = this.productService.getProducts().subscribe(
  //     products => this.products = products,
  //     error => this.errorMessage = error
  //   );
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
