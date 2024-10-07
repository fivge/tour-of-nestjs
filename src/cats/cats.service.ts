import { Injectable } from "@nestjs/common";
import { Observable, of } from "rxjs";
import Hashids from "hashids";
import Mock from "@0x64.in/mockjs";
import uniqBy from "lodash/uniqBy";

import { Cat, CatDO, CreateCatDto } from "./cat";
import { ConfigService } from "@nestjs/config";

const defaultCats: Omit<CatDO, "id" | "breed" | "valid">[] = uniqBy(
  [
    ...new Array(Mock.mock("@natural(3, 5)")).fill(null).map((_) => ({
      uid: Mock.mock("@natural(0, 99)"),
      name: Mock.mock("@first"),
      age: Mock.mock("@natural(1, 20)"),
    })),
    { uid: 1, name: "Tom", age: 2 },
  ],
  "uid",
);

@Injectable()
export class CatsService {
  private cats: CatDO[];
  private hashids: Hashids;

  private encodeId = (id: number) => this.hashids.encode(id);

  private decodeId = (id: string): number =>
    this.hashids.decode(id)[0] as number;

  constructor(private readonly configService: ConfigService) {
    const salt = this.configService.get<string>("hashsalt.cats");
    this.hashids = new Hashids(salt, 6);

    this.cats = defaultCats.map((i) => ({
      ...i,
      id: this.encodeId(i.uid),
      valid: true,
    }));
  }

  private getCatByDo = (catDO: CatDO): Cat => ({
    id: catDO.id,
    name: catDO.name,
    age: catDO.age,
    breed: catDO.breed,
  });

  getCatList(query?): Promise<Cat[]> {
    let catListDO = this.cats;
    if (query && query.id) {
      catListDO = catListDO.filter((cat) => cat.id === query.id);
    }

    const catList = catListDO.map((i) => ({
      ...this.getCatByDo(i),
      uid: query._dev_ ? i.uid : undefined,
    }));
    return Promise.resolve(catList);
  }

  getCatListObservable(): Observable<Cat[]> {
    const catList = this.cats.map((i) => this.getCatByDo(i));

    return of(catList);
  }

  getCat(id: string): Promise<Cat> {
    let catDO = this.cats.find((cat) => cat.id === id);
    if (!catDO) {
      return Promise.reject("no cat found in service");
    }
    const newCat = this.getCatByDo(catDO);
    return Promise.resolve(newCat);
  }

  getCatByUid(uid: number): Promise<Cat> {
    console.log("service", uid, typeof uid);
    let catDO = this.cats.find((cat) => cat.uid === uid);
    if (!catDO) {
      return Promise.reject("no cat found in service");
    }
    const newCat = this.getCatByDo(catDO);
    return Promise.resolve(newCat);
  }

  addCat(cat: CreateCatDto) {
    const uid = Math.max(...this.cats.map((i) => i.uid)) + 1;
    // TODO 此处转化可以考虑是否能使用Pipe处理
    const id = this.hashids.encode(uid);
    const newCatDO: CatDO = {
      ...cat,
      id,
      uid,
      valid: true,
    };

    this.cats = [...this.cats, newCatDO];

    return this.getCatByDo(newCatDO);
  }
}
