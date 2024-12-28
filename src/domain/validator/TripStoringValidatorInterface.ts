import { TripInterface } from '../../driven/ports/ForObtainingTrips.Interface'
import { ValidationResult } from './ValidationResult'

export interface TripStoringValidatorInterface {
    validateTripRequest(trip: TripInterface): ValidationResult
}
