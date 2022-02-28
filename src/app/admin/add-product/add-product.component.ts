import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/products/product.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onAddProduct(form: NgForm) {
    const product = {name: form.value.name, price: form.value.price, image: form.value.image, brand: form.value.brand, type: form.value.type, availability: form.value.availability}
    this.adminService.addProduct(product)
    form.reset()
  }

}
