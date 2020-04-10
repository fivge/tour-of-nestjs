import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_price')
export class ProductConfig {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  /** 云中心 */
  @Column()
  cloudcenter: string;
  /** 产品线编码 */
  @Column()
  pid: string;
  /** 计费要素 */
  @Column({ nullable: true })
  pcolid: string;
  /** 产品线名称 */
  @Column({ nullable: true })
  pcolname: string;
  /** 规格 */
  @Column({ nullable: true })
  model: string;
  /** 价格类型 */
  @Column({ type: 'int', nullable: true })
  ptype: number;
  /** 范围类型 */
  @Column({ type: 'int', nullable: true })
  rangetype: number;
  /** 范围 */
  @Column({ nullable: true })
  rangesize: string;
  /** 天价格 */
  @Column({ nullable: true })
  tprice: string;
  /** 规格描述 */
  @Column({ nullable: true })
  spec: string;
  /** 服务说明 */
  @Column({ nullable: true })
  servicedesc: string;
  /** 年价格 */
  @Column({ nullable: true })
  yprice: string;
  /** 是否标准 */
  @Column({ nullable: true })
  isstandard: boolean;
}
