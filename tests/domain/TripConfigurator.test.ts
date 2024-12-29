import { TripConfigurator } from '../../src/domain/TripConfigurator'
import { TripValidator } from '../../src/domain/validator/TripValidator'
import ObtainingTripsAdapterStub from '../driven/adapters/ObtainingTripsAdapterStub'
import { SilentLogger } from '../utils/SilentLogger'

describe('TripConfigurator', () => {
    const tripConfigurator = new TripConfigurator(
        new ObtainingTripsAdapterStub(),
        new TripValidator(),
        new SilentLogger(),
    )

    describe('getTrips', () => {
        it('should return trips successfully when all validations pass', async () => {
            const result = await tripConfigurator.getTrips(
                'CDG',
                'LHR',
                'fastest',
            )

            expect(result.status).toBe(200)
            expect(result.data).toHaveLength(2)
        })

        it('should return error status when validation fails with invalid IATA code', async () => {
            const result = await tripConfigurator.getTrips(
                'XX',
                'LHR',
                'fastest',
            )

            expect(result).toEqual({
                status: 400,
                message: 'Invalid origin IATA code: XX',
                data: [],
            })
        })

        it('should return error status when validation fails with invalid sort strategy', async () => {
            const result = await tripConfigurator.getTrips(
                'CDG',
                'LHR',
                'invalid',
            )

            expect(result).toEqual({
                status: 400,
                data: [],
                message:
                    'Invalid sort strategy: invalid. Must be one of: fastest, cheapest',
            })
        })

        it('should return error status when trip client fails', async () => {
            //Passing an LAX as origin and destination will trigger an error in the trip client stub
            const result = await tripConfigurator.getTrips(
                'LAX',
                'LAX',
                'fastest',
            )

            expect(result).toEqual({
                status: 400,
                data: [],
                message: 'Error while fetching trips',
            })
        })

        it('should sort trips by duration when sort strategy is fastest', async () => {
            const result = await tripConfigurator.getTrips(
                'CDG',
                'LHR',
                'fastest',
            )

            expect(result.status).toBe(200)
            expect(result.data[0].duration).toBe(50)
            expect(result.data[1].duration).toBe(100)
        })

        it('should sort trips by cost when sort strategy is cheapest', async () => {
            const result = await tripConfigurator.getTrips(
                'SYD',
                'GRU',
                'cheapest',
            )

            expect(result.status).toBe(200)
            expect(result.data[0].cost).toBe(80)
            expect(result.data[1].cost).toBe(160)
        })
    })
})
