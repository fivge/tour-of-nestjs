export class IProductConfig {
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
}
