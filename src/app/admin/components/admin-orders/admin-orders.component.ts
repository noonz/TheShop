import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'shared/services/order.service';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
    public orders$!: Observable<any>;

    constructor(private orderService: OrderService) {}
    ngOnInit() {
        this.orders$ = this.orderService.getOrders();
    }
}
