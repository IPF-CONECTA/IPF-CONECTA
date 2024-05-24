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
  tableName: "likes",
  timestamps: true,
})
class Like extends Model {
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  liked_at!: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;
  @BelongsTo(() => User)
  user!: User;
}

export default Like;