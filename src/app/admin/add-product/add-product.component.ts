import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  mode = 'create'
  private productId: string
  product: any

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit'
        this.productId = paramMap.get('id')
        this.adminService.getProduct(this.productId)
          .subscribe(product => {
            this.product = product
          })
      } else {
        this.mode = 'create'
        this.productId = null
      }
    })
  }

  onSaveProduct(form: NgForm) {
    if(form.invalid) {
      return
    }
    const product = {name: form.value.name, price: form.value.price, image: form.value.image, brand: form.value.brand, type: form.value.type, availability: form.value.availability}
    if(this.mode === 'create') {
      this.adminService.addProduct(product)
    } else {
      this.adminService.updateProduct(this.productId, product)
    }

    form.reset()
  }

}
