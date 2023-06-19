export class IProductConfig {
  /** 云中心 */
  cloudcenter: string;
  /** 产品线编码 */
  pid: string;
  /** 计费要素 */
  pcolid: string;
  /** 产品线名称 */
  pcolname: string;
  /** 规格 */
  model: string;
  /** 价格类型 */
  ptype: number;
  /** 范围类型 */
  rangetype: number;
  /** 范围 */
  rangesize: string;
  /** 天价格 */
  tprice: string;
  /** 规格描述 */
  spec: string;
  /** 服务说明 */
  servicedesc: string;
  /** 年价格 */
  yprice: string;
  /** 是否标准 */
  isstandard: boolean;
  /** 数组转对象 */
  static fromArray(params: (string | number)[]): IProductConfig {
    const t: IProductConfig = new IProductConfig();
    const arr = [...params];
    t.pid = arr[0] as string;
    t.pcolid = arr[1] as string;
    t.pcolname = arr[2] as string;
    t.model = arr[3] as string;
    t.ptype = arr[4] as number;
    t.rangetype = arr[5] as number;
    t.rangesize = arr[6] as string;
    t.tprice = arr[7] as string;
    t.spec = arr[8] as string;
    t.servicedesc = arr[9] as string;
    t.yprice = arr[10] as string;
    t.isstandard = (arr[11] as number) === 1 ? false : true;
    return t;
  }
  /** 对象转数组 */
  static toArray(param: IProductConfig): (string | number)[] {
    return [
      param.pid,
      param.pcolid,
      param.pcolname,
      param.model,
      param.ptype,
      param.rangetype,
      param.rangesize,
      param.tprice,
      param.spec,
      param.servicedesc,
      param.yprice,
      param.isstandard ? 1 : 0,
    ];
  }
}
