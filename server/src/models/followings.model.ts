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
  tableName: "followings",
})
class Following extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  followerId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  followedId!: number;

  @BelongsTo(() => User, "followerId")
  follower!: User;

  @BelongsTo(() => User, "followedId")
  followed!: User;
}

export default Following;
