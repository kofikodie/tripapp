import { TripValidatorInterface } from './TripValidatorInterface'

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
    ): void {
        if (!this.validateIATACode(origin)) {
            throw new Error(`Invalid origin IATA code: ${origin}`)
        }

        if (!this.validateIATACode(destination)) {
            throw new Error(`Invalid destination IATA code: ${destination}`)
        }

        if (!this.validateSortStrategy(sortBy)) {
            throw new Error(
                `Invalid sort strategy: ${sortBy}. Must be one of: ${this.VALID_SORT_STRATEGIES.join(
                    ', ',
                )}`,
            )
        }
    }
}
