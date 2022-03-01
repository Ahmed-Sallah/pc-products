import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AdminService } from '../admin.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: string
  totalPrice: number = 0

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  order: any

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.orderId = paramMap.get('id')
      this.adminService.getOrder(this.orderId)
        .subscribe(response => {
          this.order = response
          for(let item of this.order.items) {
            this.totalPrice += item.price
          }
        })
    })
  }

  onDeleteOrder() {
    this.adminService.deleteOrder(this.orderId)
  }

}
