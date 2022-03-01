import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent implements OnInit {

  orders: any
  search = ''

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getOrders().subscribe(response => {
      this.orders = response
    })
  }

}
