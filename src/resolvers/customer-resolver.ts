import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Customer } from "../dtos/models/customer-model"
import customers from "../mocks/customers-mock.json"
import { CreateCustomerInput } from "../dtos/inputs/create-customer-input"
import path from 'node:path'
import fs from 'node:fs'

@Resolver()
export class CustomerResolver {
    @Query(() => [Customer])
    async customers() {
        const customersList: Customer[] = customers
        return customersList
    }

    @Mutation(() => Customer)
    async createCustomer(@Arg('data') data: CreateCustomerInput) {
        const customer: Customer = {
            id: data.id,
            name: data.name,
        }
        const customersList: Customer[] = customers
        const customersPath = path.resolve(__dirname, '../mocks/customers-mock.json')
        fs.writeFileSync(customersPath, JSON.stringify([...customersList, customer]))
        return customer
    }
}