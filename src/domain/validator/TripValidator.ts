import { TRIP_CONSTANTS } from '../constants/TripConstants'
import { TripValidatorInterface } from './TripValidatorInterface'
import { ValidationResult } from './ValidationResult'

export class TripValidator implements TripValidatorInterface {
    validateTripRequest(
        origin: string,
        destination: string,
        sortBy: string,
    ): ValidationResult {
        if (!TRIP_CONSTANTS.SUPPORTED_IATA_CODES.includes(origin)) {
            return {
                isValid: false,
                message: `Invalid origin IATA code: ${origin}`,
            }
        }

        if (!TRIP_CONSTANTS.SUPPORTED_IATA_CODES.includes(destination)) {
            return {
                isValid: false,
                message: `Invalid destination IATA code: ${destination}`,
            }
        }

        if (!Object.values(TRIP_CONSTANTS.SORT_STRATEGIES).includes(sortBy)) {
            return {
                isValid: false,
                message: `Invalid sort strategy: ${sortBy}. Must be one of: ${Object.values(
                    TRIP_CONSTANTS.SORT_STRATEGIES,
                ).join(', ')}`,
            }
        }

        return { isValid: true }
    }
}
