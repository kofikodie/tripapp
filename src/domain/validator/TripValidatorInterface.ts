export interface TripValidatorInterface {
    validateIATACode(code: string): boolean
    validateSortStrategy(strategy: string): boolean
    validateTripRequest(
        origin: string,
        destination: string,
        sortBy: string,
    ): void
}
