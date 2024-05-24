import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./users.model";

@Table({
  timestamps: false,
  tableName: "posts",
})
export default class Post extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  descripion!: string;


  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  create_at!: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;
  
  @BelongsTo(() => User)
  user!: User;

}
