import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Appointment } from "../dtos/models/appointment-model";
import { Customer } from "../dtos/models/customer-model";
import appointments from "../mocks/appointments-mock.json";
import customers from "../mocks/customers-mock.json"
import path from "node:path"
import fs from "node:fs"
@Resolver(() => Appointment)
export class AppointmentsResolver {
    @Query(() => [Appointment])
    async appointments() {
        const appointmentsList: Appointment[] = appointments.map(appointment => (
            { ...appointment, startsAt: new Date(appointment.startsAt), endsAt: new Date(appointment.endsAt) }
        ))
        return appointmentsList
    }

    @Mutation(() => Appointment)
    async createAppointment(@Arg('data') data: CreateAppointmentInput) {
        const appointment: Appointment = {
            customerId: data.customerId,
            startsAt: data.startsAt,
            endsAt: data.endsAt,
        }
        const appointmentsList: Appointment[] = appointments.map(appointment => (
            { ...appointment, startsAt: new Date(appointment.startsAt), endsAt: new Date(appointment.endsAt) }
        ))
        const appointmentsPath = path.resolve(__dirname, '../mocks/appointments-mock.json')
        fs.writeFileSync(appointmentsPath, JSON.stringify([...appointmentsList, appointment]))
        return appointment
    }

    @FieldResolver(() => Customer)
    async customer(@Root() appointment: Appointment) {
        const customersList: Customer[] = customers
        const customer = customersList.find(customer => customer.id === appointment.customerId)
        return customer
    }
}