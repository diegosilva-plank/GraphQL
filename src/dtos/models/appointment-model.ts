import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Appointment {
    @Field()
    customerId: string

    @Field()
    startsAt: Date

    @Field()
    endsAt: Date
}