import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@Entity("rentals")
export class Rental {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  car_id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  total: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
