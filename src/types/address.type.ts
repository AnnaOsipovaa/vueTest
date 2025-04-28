import { CoordinatesType } from "./coordinates.type"

export type AddressType = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: CoordinatesType
}