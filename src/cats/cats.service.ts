import { Injectable } from "@nestjs/common";
import { Observable, of } from "rxjs";
import Hashids from "hashids";
import Mock from "@0x64.in/mockjs";
import uniqBy from "lodash/uniqBy";

import { Cat, CatRequest } from "./cat";
import { ConfigService } from "@nestjs/config";

const defaultCats = uniqBy(
  [
    ...new Array(Mock.mock("@natural(3, 5)")).fill(null).map((_) => ({
      id: Mock.mock("@natural(0, 99)"),
      name: Mock.mock("@first"),
      age: Mock.mock("@natural(1, 20)"),
    })),
    { id: 1, name: "Tom", age: 2 },
  ],
  "id",
);

@Injectable()
export class CatsService {
  private cats: Cat[] = defaultCats;
  private hashids: Hashids;

  constructor(private readonly configService: ConfigService) {
    const salt = this.configService.get<string>("hashsalt.cats");
    this.hashids = new Hashids(salt, 6);
  }

  private encodeId = (id: number) => this.hashids.encode(id);

  private decodeId = (id: string) => this.hashids.decode(id)[0];

  getCatList(request?): Promise<Cat[]> {
    let newCatList = this.cats;
    // TODO validation
    if (request && request.id) {
      newCatList = newCatList.filter(
        (cat) => cat.id === this.decodeId(request.id),
      );
    }
    newCatList = newCatList.map((i) => ({
      ...i,
      id: this.encodeId(i.id as number),
    }));
    return Promise.resolve(newCatList);
  }

  getCatListObservable(): Observable<Cat[]> {
    const catList = this.cats.map((i) => ({
      ...i,
      id: this.encodeId(i.id as number),
    }));

    return of(catList);
  }

  getCat(id): Promise<Cat> {
    let newCat = this.cats.find((cat) => cat.id === this.decodeId(id));
    if (!newCat) {
      return Promise.reject("no cat found in service");
    }
    newCat = { ...newCat, id: this.encodeId(newCat.id as number) };
    return Promise.resolve(newCat);
  }

  addCat(cat: CatRequest) {
    const id = this.cats.length + 1;
    let _cat: Cat;
    const uid = this.hashids.encode(id);
    _cat = { ...cat, id };
    this.cats.push(_cat);
    return {
      uid,
      params: cat,
    };
  }
}
