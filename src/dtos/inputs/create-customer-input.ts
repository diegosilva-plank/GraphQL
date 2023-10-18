import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCustomerInput {
    @Field()
    id: string;
    
    @Field()
    name: string;
}