import { TripConfigurator } from '../../src/domain/TripConfigurator'
import { TripClientInterface } from '../../src/driven/ports/TripClientInterface'
import BuildTripResponse from '../../src/domain/builder/BuildTripResponse'
import { TripValidator } from '../../src/domain/validator/TripValidator'
import ForTripClientStub from '../driven/ForTripClientStub'
import { SilentLogger } from '../utils/SilentLogger'

describe('TripConfigurator', () => {
    let tripConfigurator: TripConfigurator
    let tripClient: TripClientInterface
    let buildTripResponse: BuildTripResponse
    let tripValidator: TripValidator
    let logger: SilentLogger

    beforeEach(() => {
        tripClient = new ForTripClientStub()
        buildTripResponse = new BuildTripResponse()
        tripValidator = new TripValidator()
        logger = new SilentLogger()

        tripConfigurator = new TripConfigurator(
            tripClient,
            buildTripResponse,
            tripValidator,
            logger,
        )
    })

    describe('getTrips', () => {
        it('should return trips successfully when all validations pass', async () => {
            const result = await tripConfigurator.getTrips(
                'CDG',
                'LHR',
                'fastest',
            )

            expect(result.status).toBe(200)
            expect(result.data).toHaveLength(5)
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
            const result = await tripConfigurator.getTrips(
                'ERROR',
                'LHR',
                'fastest',
            )

            expect(result).toEqual({
                status: 400,
                data: [],
                message: 'Invalid origin IATA code: ERROR',
            })
        })

        it('should sort trips by duration when sort strategy is fastest', async () => {
            const result = await tripConfigurator.getTrips(
                'CDG',
                'LHR',
                'fastest',
            )

            expect(result.status).toBe(200)
            expect(result.data[0].duration).toBe(5) // Flight and train both have duration 5
            expect(result.data[1].duration).toBe(5)
            expect(result.data[2].duration).toBe(7)
        })

        it('should sort trips by cost when sort strategy is cheapest', async () => {
            const result = await tripConfigurator.getTrips(
                'SYD',
                'GRU',
                'cheapest',
            )

            expect(result.status).toBe(200)
            expect(result.data[0].cost).toBe(625) // Flight is cheapest
            expect(result.data[1].cost).toBe(1709)
            expect(result.data[2].cost).toBe(2386)
        })
    })
})
