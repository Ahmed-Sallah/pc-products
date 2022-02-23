import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Product } from "../products/product.model";

@Component({
  templateUrl: './addToCartDialog.component.html',
  styleUrls: ['./addToCartDialog.component.css']
})

export class AddToCartDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product, qty: number}) {
    console.log(data.qty)
  }
}
