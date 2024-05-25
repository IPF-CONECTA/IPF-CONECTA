import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import SocialNetwork from "./socialNetworks.model";

@Table({
  timestamps: false,
  tableName: "socials",
})
class Social extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usersId!: number;

  @ForeignKey(() => SocialNetwork)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  socialNetworksId!: number;

  @BelongsTo(() => SocialNetwork)
  socialNetwork!: SocialNetwork;
}

export default Social;
