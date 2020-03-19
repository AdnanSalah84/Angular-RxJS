import { Component, OnInit } from "@angular/core";

//import { Subscription } from "rxjs";

import { Product } from "./product";
import { ProductService } from "./product.service";
import { Observable } from "rxjs";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
//, OnDestroy
export class ProductListComponent implements OnInit {
  pageTitle = "Product List";
  errorMessage = "";
  categories;

  //products: Product[] = [];
  products$: Observable<Product[]>;
  //sub: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // this.sub = this.productService.getProducts()
    //   .subscribe(
    //     products => this.products = products,
    //     error => this.errorMessage = error
    //   );

    this.products$ = this.productService.getProducts();
  }

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
