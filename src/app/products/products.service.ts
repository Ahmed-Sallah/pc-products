import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { AddToCartDialog } from "../CartDialog/addToCartDialog.component";
import { Product } from "./product.model";

@Injectable({providedIn: 'root'})

export class ProductsService {
  private products: Product[] = []
  private productUpdated = new Subject<Product[]>()
  private filteredProducts = new Subject<Product[]>()
  private cartListener = new Subject<{_id: string, name: string, price: number, qty: number, image: string}[]>()
  private cartList: {_id: string, name: string, price: number, qty: number, image: string}[] = []

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  getProducts(type: string) {
    this.http.get<{message: string, products: Product[]}>('http://localhost:3000/products/' + type)
      .subscribe(productData => {
        this.products = productData.products
        this.productUpdated.next([...this.products])
      })
  }

  getProductsUpdateListener() {
    return this.productUpdated.asObservable()
  }

  getProduct(id: string, type: string) {
    return this.http.get<{message: string, product: Product}>('http://localhost:3000/products/' + type + '/' + id)
  }

  filter(form: NgForm, brandList) {
    let filteredList = []
    if(filteredList.length === 0) {
      this.productUpdated.next([...this.products])
    }
    for(let b of brandList) {
      if(form.controls[b].value === true) {
        if(form.controls['inStock'].value === true) {
          if(form.controls['outOfStock'].value === true) {
            filteredList.push(...this.products.filter(p => p.brand === b && p.availability === false))
            this.filteredProducts.next([...filteredList])
          }
          filteredList.push(...this.products.filter(p => p.brand === b && p.availability === true))
          this.filteredProducts.next([...filteredList])
        }
        else if(form.controls['outOfStock'].value === true) {
          if(form.controls['inStock'].value === true) {
            filteredList.push(...this.products.filter(p => p.brand === b && p.availability === true))
            this.filteredProducts.next([...filteredList])
          }
          filteredList.push(...this.products.filter(p => p.brand === b && p.availability === false))
          this.filteredProducts.next([...filteredList])
        }
        else {
          filteredList.push(...this.products.filter(p => p.brand === b))
          this.filteredProducts.next([...filteredList])
        }
      }
    }


  }



    // let filteredList = []
    // if(filteredList.length === 0) {
    //   this.productUpdated.next([...this.products])
    // }
    // for(let b of brandList) {
    //   if(form.controls[b].value === true) {
    //     if(form.controls['inStock'].value === true) {
    //       if(form.controls['outOfStock'].value === true) {
    //         filteredList.push(...this.products.filter(p => p.brand === b && p.availability === false))
    //         this.filteredProducts.next([...filteredList])
    //       }
    //       filteredList.push(...this.products.filter(p => p.brand === b && p.availability === true))
    //       this.filteredProducts.next([...filteredList])
    //       if(filteredList.length === 0) {
    //         this.filteredProducts.next([])
    //       }
    //     }
    //     else if(form.controls['outOfStock'].value === true) {
    //       if(form.controls['inStock'].value === true) {
    //         filteredList.push(...this.products.filter(p => p.brand === b && p.availability === true))
    //         this.filteredProducts.next([...filteredList])
    //       }
    //       filteredList.push(...this.products.filter(p => p.brand === b && p.availability === false))
    //       this.filteredProducts.next([...filteredList])
    //       if(filteredList.length === 0) {
    //         this.filteredProducts.next([])
    //       }
    //     }
    //     else {
    //       filteredList.push(...this.products.filter(p => p.brand === b))
    //       this.filteredProducts.next([...filteredList])
    //     }
    //   }

    // }
  getFilteredProductsListener() {
    return this.filteredProducts.asObservable()
  }

  addToCart(product: Product, qty: number) {
    if(!product.availability) {
      this.dialog.open(AddToCartDialog, {data: {product, qty}})
      return
    }
    this.dialog.open(AddToCartDialog, {data: {product, qty}})
    if(localStorage.getItem('cart') === null) {
      localStorage.setItem('cart', JSON.stringify(this.cartList))
      this.cartList.push({
        _id: product._id, name: product.name, price: product.price, qty: 1, image: product.image
      })
      localStorage.setItem('cart', JSON.stringify(this.cartList))
    } else {
      this.cartList = JSON.parse(localStorage.getItem('cart'))
      let productincart = this.cartList.find(p => p.name === product.name)
      if(productincart) {
        productincart.qty += qty
      }
      else if (!productincart) {
        this.cartList.push({
          _id: product._id, name: product.name, price: product.price, qty: qty, image: product.image
        })
      }
      localStorage.setItem('cart', JSON.stringify(this.cartList))
    }
    this.cartListener.next([...this.cartList])
  }

  getItemsInCart() {
    return JSON.parse(localStorage.getItem('cart'))
  }

  getCartListener() {
    return this.cartListener.asObservable()
  }

  deleteFromCart(item: {_id: string, name: string, price: number, qty: number, image: string}) {
    this.cartList = JSON.parse(localStorage.getItem('cart'))
    this.cartList = this.cartList.filter(p => p._id !== item._id)
    localStorage.setItem('cart', JSON.stringify(this.cartList))
    this.cartListener.next([...this.cartList])
  }

}
