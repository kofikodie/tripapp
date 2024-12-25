import { TripValidator } from "../../../src/domain/validator/TripValidator"


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
        it('should not throw for valid trip request', () => {
            expect(() =>
                validator.validateTripRequest('CDG', 'JFK', 'fastest'),
            ).not.toThrow()
        })

        it('should throw ClientError for invalid origin', () => {
            expect(() =>
                validator.validateTripRequest('CD', 'JFK', 'fastest'),
            ).toThrow(Error)
            expect(() =>
                validator.validateTripRequest('CD', 'JFK', 'fastest'),
            ).toThrow('Invalid origin IATA code: CD')
        })

        it('should throw ClientError for invalid destination', () => {
            expect(() =>
                validator.validateTripRequest('CDG', 'JF', 'fastest'),
            ).toThrow(Error)
            expect(() =>
                validator.validateTripRequest('CDG', 'JF', 'fastest'),
            ).toThrow('Invalid destination IATA code: JF')
        })

        it('should throw ClientError for invalid sort strategy', () => {
            expect(() =>
                validator.validateTripRequest('CDG', 'JFK', 'invalid'),
            ).toThrow(Error)
            expect(() =>
                validator.validateTripRequest('CDG', 'JFK', 'invalid'),
            ).toThrow(
                'Invalid sort strategy: invalid. Must be one of: fastest, cheapest',
            )
        })
    })
})