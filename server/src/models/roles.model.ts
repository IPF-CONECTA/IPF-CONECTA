import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "roles",
})

class Role extends Model {
  @Column({
    type: DataType.ENUM("admin", "user", "recruiter", "inversor"),
    allowNull: false,
  })
  rol!: string;
}

export default Role