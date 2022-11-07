import { Field, ID, InterfaceType } from "@nestjs/graphql";
import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"


@InterfaceType()
export abstract class Node extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at'})
    created_at: Date

    @Field(() => Date)
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;   
}