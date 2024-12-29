import { ValidationResult } from './ValidationResult'

export interface TripValidatorInterface {
    validateSortStrategy(strategy: string): boolean
    validateTripRequest(
        origin: string,
        destination: string,
        sortBy: string,
    ): ValidationResult
}
