import { AddressType } from "./address.type"
import { CompanyType } from "./company.type"

export type UserType = {
    address: AddressType
    company: CompanyType
    email: string
    id: number
    name: string
    phone: string
    username: string
    website: string
}