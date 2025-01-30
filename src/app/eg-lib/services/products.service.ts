import {Injectable} from '@angular/core';
import { Product } from '../../model/product';

import {BaseService} from '../core/base.service';

export interface ProductRequest {
    PageSize?: number;
    IdCliente?: number;
}

//@Injectable()
@Injectable({providedIn: 'root'})
export class ProductService extends BaseService<Product, ProductRequest> {
  constructor() {
    super();
    this._url = 'http://localhost:3001/products';
    this._key = 'id';
  }
}
