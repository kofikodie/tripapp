import { TripStoringValidator } from '../../../src/domain/validator/TripStoringValidator'
import { TripInterface } from '../../../src/driven/ports/ForObtainingTrips.Interface'

describe('TripStoringValidator', () => {
    let validator: TripStoringValidator
    let validTrip: TripInterface

    beforeEach(() => {
        validator = new TripStoringValidator()
        validTrip = {
            trip_id: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
            origin: 'SYD',
            destination: 'GRU',
            cost: 625,
            duration: 5,
            type: 'flight',
            display_name: 'from SYD to GRU by flight',
        }
    })

    describe('validateTripRequest', () => {
        it('should return true for a valid trip with supported IATA codes', () => {
            const result = validator.validateTripRequest(validTrip)
            expect(result.isValid).toBe(true)
        })

        it('should return false for unsupported origin IATA code', () => {
            const trip = { ...validTrip, origin: 'ABC' }
            const result = validator.validateTripRequest(trip)
            expect(result.isValid).toBe(false)
            expect(result.message).toBe('Unsupported origin IATA code: ABC')
        })

        it('should return false for unsupported destination IATA code', () => {
            const trip = { ...validTrip, destination: 'XYZ' }
            const result = validator.validateTripRequest(trip)
            expect(result.isValid).toBe(false)
            expect(result.message).toBe(
                'Unsupported destination IATA code: XYZ',
            )
        })

        it('should return false for a trip with an invalid trip_id', () => {
            const trip = { ...validTrip, trip_id: '' }
            const result = validator.validateTripRequest(trip)
            expect(result.isValid).toBe(false)
            expect(result.message).toBe('Invalid trip ID: .')
        })

        it('should return false for a trip with an invalid origin', () => {
            const trip = { ...validTrip, origin: 'invalid' }
            const result = validator.validateTripRequest(trip)
            expect(result.isValid).toBe(false)
            expect(result.message).toBe('Invalid origin IATA code: invalid')
        })

        it('should return false for a trip with an invalid destination', () => {
            const trip = { ...validTrip, destination: 'invalid' }
            const result = validator.validateTripRequest(trip)
            expect(result.isValid).toBe(false)
            expect(result.message).toBe(
                'Invalid destination IATA code: invalid',
            )
        })

        it('should return false for a trip with an invalid trip cost', () => {
            const trip = { ...validTrip, cost: -1 }
            const result = validator.validateTripRequest(trip)
            expect(result.isValid).toBe(false)
            expect(result.message).toBe('Cost must be a positive number')
        })

        it('should return false for a trip with an invalid trip duration', () => {
            const trip = { ...validTrip, duration: -1 }
            const result = validator.validateTripRequest(trip)
            expect(result.isValid).toBe(false)
            expect(result.message).toBe('Duration must be a positive number')
        })

        it('should return false for a trip with an invalid trip type', () => {
            const trip = { ...validTrip, type: 'invalid' }
            const result = validator.validateTripRequest(trip)
            expect(result.isValid).toBe(false)
            expect(result.message).toBe(
                'Type must be one of: flight, train, car',
            )
        })

        it('should return false for a trip with an invalid display name', () => {
            const trip = { ...validTrip, display_name: '' }
            const result = validator.validateTripRequest(trip)
            expect(result.isValid).toBe(false)
            expect(result.message).toBe('Display name is required')
        })

        it('should return a correct validation result for a trip with an valid request', () => {
            const result = validator.validateTripRequest(validTrip)
            expect(result.isValid).toBe(true)
        })
    })
})
