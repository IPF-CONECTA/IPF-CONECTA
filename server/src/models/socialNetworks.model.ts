import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";


@Table({
    timestamps: false,
    tableName: "socialsNetworks",
})

@Column({
    type: DataType.STRING,
    allowNull: false,
})

class SocialNetwork extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    url!: string; 
}

export default SocialNetwork;