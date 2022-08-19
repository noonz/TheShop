import { Injectable } from '@angular/core';
import {
    AngularFireDatabase,
    AngularFireObject
} from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private db: AngularFireDatabase) {}

    create(product: any) {
        return this.db.list('/products').push(product);
    }

    getAll() {
        return this.db.list('/products').snapshotChanges();

    }

    getItem(productId: string) {
        return this.db.object(`/products/${productId}`);
    }

    updateItem(productId: string, product: any) {
        return this.db.object(`/products/${productId}`).update(product);
    }

    deleteItem(productId: string) {
        return this.db.object(`/products/${productId}`).remove();
    }
}
