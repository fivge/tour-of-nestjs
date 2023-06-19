import { Injectable } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import { Cat } from './cat';
import { CatRequest } from './cat-request';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  addCat(cat: CatRequest) {
    const id = '0x01';
    let _cat: Cat = new Cat();
    _cat = { ...cat, id };
    this.cats.push(_cat);
    return of(_cat);
  }

  getCatList(): Observable<Cat[]> {
    return of(this.cats);
  }
}
