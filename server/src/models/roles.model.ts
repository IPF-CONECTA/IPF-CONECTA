import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "roles",
})

class Role extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  rol!: string;

  
}

export default Role