import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "forums",
})
class Forum extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  forumName!: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  forumDescription!: string;
}

export default Forum;
