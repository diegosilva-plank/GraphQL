import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Customer {
    @Field()
    id: string
    
    @Field()
    name: string
}