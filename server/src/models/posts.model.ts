import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./users.model";
import Forum from "./forums.model";

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
  description!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt!: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Forum)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  forumId!: number;

  @BelongsTo(() => Forum)
  forum!: Forum;

  @BelongsTo(() => User)
  user!: User;
}
