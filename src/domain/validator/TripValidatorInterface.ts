import { ValidationResult } from './ValidationResult'

export interface TripValidatorInterface {
    validateTripRequest(
        origin: string,
        destination: string,
        sortBy: string,
    ): ValidationResult
}
