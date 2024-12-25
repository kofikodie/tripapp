import { TripValidatorInterface } from './TripValidatorInterface'
import { ValidationResult } from './ValidationResult'

export class TripValidator implements TripValidatorInterface {
    private readonly VALID_SORT_STRATEGIES = ['fastest', 'cheapest']
    private readonly IATA_CODE_REGEX = /^[A-Z]{3}$/

    validateIATACode(code: string): boolean {
        return this.IATA_CODE_REGEX.test(code)
    }

    validateSortStrategy(strategy: string): boolean {
        return this.VALID_SORT_STRATEGIES.includes(strategy)
    }

    validateTripRequest(
        origin: string,
        destination: string,
        sortBy: string,
    ): ValidationResult {
        if (!this.validateIATACode(origin)) {
            return {
                isValid: false,
                message: `Invalid origin IATA code: ${origin}`,
            }
        }

        if (!this.validateIATACode(destination)) {
            return {
                isValid: false,
                message: `Invalid destination IATA code: ${destination}`,
            }
        }

        if (!this.validateSortStrategy(sortBy)) {
            return {
                isValid: false,
                message: `Invalid sort strategy: ${sortBy}. Must be one of: ${this.VALID_SORT_STRATEGIES.join(
                    ', ',
                )}`,
            }
        }

        return { isValid: true }
    }
}
