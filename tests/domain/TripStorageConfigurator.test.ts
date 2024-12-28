import { TripStorageConfigurator } from '../../src/domain/TripStorageConfigurator'
import { TripStoringValidator } from '../../src/domain/validator/TripStoringValidator'
import ForStoringTripsAdapterStub from '../driven/adapters/ForStoringTripsAdapterStub'
import { SilentLogger } from '../utils/SilentLogger'

describe('TripStorageConfigurator', () => {
    const tripStorageConfigurator = new TripStorageConfigurator(
        new ForStoringTripsAdapterStub(),
        new TripStoringValidator(),
        new SilentLogger(),
    )

    describe('saveTrip', () => {
        it('should save trip successfully when all validations pass', async () => {
            const trip = {
                trip_id: 'valid-id',
                origin: 'CDG',
                destination: 'LHR',
                cost: 100,
                duration: 120,
                type: 'flight',
                display_name: 'Flight from Paris to London',
            }

            const result = await tripStorageConfigurator.saveTrip(trip)

            expect(result).toEqual({
                success: true,
                message: 'Trip saved successfully',
            })
        })

        it('should return error when validation fails', async () => {
            const invalidTrip = {
                trip_id: 'valid-id',
                origin: 'invalid',
                destination: 'LHR',
                cost: 100,
                duration: 120,
                type: 'flight',
                display_name: 'Flight from Paris to London',
            }

            const result = await tripStorageConfigurator.saveTrip(invalidTrip)

            expect(result).toEqual({
                success: false,
                message: 'Invalid origin IATA code: invalid',
            })
        })

        it('should return error when storage fails', async () => {
            const trip = {
                trip_id: 'ERR',
                origin: 'CDG',
                destination: 'LHR',
                cost: 100,
                duration: 120,
                type: 'flight',
                display_name: 'Flight from Paris to London',
            }

            const result = await tripStorageConfigurator.saveTrip(trip)

            expect(result).toEqual({
                success: false,
                message: 'Error while saving trip',
            })
        })
    })

    describe('getTrips', () => {
        it('should return trips from storage', async () => {
            const trips = await tripStorageConfigurator.getTrips()
            expect(trips).toEqual([])
        })
    })
})
