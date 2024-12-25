import { TripValidator } from '../../../src/domain/validator/TripValidator'

describe('TripValidator', () => {
    let validator: TripValidator

    beforeEach(() => {
        validator = new TripValidator()
    })

    describe('validateIATACode', () => {
        it('should return true for valid IATA codes', () => {
            expect(validator.validateIATACode('CDG')).toBe(true)
            expect(validator.validateIATACode('JFK')).toBe(true)
            expect(validator.validateIATACode('LHR')).toBe(true)
        })

        it('should return false for invalid IATA codes', () => {
            expect(validator.validateIATACode('cd')).toBe(false)
            expect(validator.validateIATACode('CDGG')).toBe(false)
            expect(validator.validateIATACode('12G')).toBe(false)
            expect(validator.validateIATACode('')).toBe(false)
        })
    })

    describe('validateSortStrategy', () => {
        it('should return true for valid sort strategies', () => {
            expect(validator.validateSortStrategy('fastest')).toBe(true)
            expect(validator.validateSortStrategy('cheapest')).toBe(true)
        })

        it('should return false for invalid sort strategies', () => {
            expect(validator.validateSortStrategy('invalid')).toBe(false)
            expect(validator.validateSortStrategy('')).toBe(false)
        })
    })

    describe('validateTripRequest', () => {
        it('should return valid result for valid trip request', () => {
            const result = validator.validateTripRequest(
                'CDG',
                'JFK',
                'fastest',
            )
            expect(result).toEqual({ isValid: true })
        })

        it('should return invalid result with message for invalid origin', () => {
            const result = validator.validateTripRequest('CD', 'JFK', 'fastest')
            expect(result).toEqual({
                isValid: false,
                message: 'Invalid origin IATA code: CD',
            })
        })

        it('should return invalid result with message for invalid destination', () => {
            const result = validator.validateTripRequest('CDG', 'JF', 'fastest')
            expect(result).toEqual({
                isValid: false,
                message: 'Invalid destination IATA code: JF',
            })
        })

        it('should return invalid result with message for invalid sort strategy', () => {
            const result = validator.validateTripRequest(
                'CDG',
                'JFK',
                'invalid',
            )
            expect(result).toEqual({
                isValid: false,
                message:
                    'Invalid sort strategy: invalid. Must be one of: fastest, cheapest',
            })
        })
    })
})
