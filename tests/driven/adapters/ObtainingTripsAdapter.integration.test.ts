import nock from 'nock'
import ObtainingTripsAdapter from '../../../src/driven/adapters/ObtainingTripsAdapter'
import dotenv from 'dotenv'

dotenv.config()

describe('ObtainingTripsAdapter Integration', () => {
    let adapter: ObtainingTripsAdapter
    const API_URL = process.env.API_URL || ''
    const API_KEY = process.env.API_KEY || ''

    beforeEach(() => {
        adapter = new ObtainingTripsAdapter()
        nock.cleanAll()
    })

    afterAll(() => {
        nock.restore()
    })

    const mockTripsResponse = [
        {
            id: '1',
            origin: 'SYD',
            destination: 'GRU',
            cost: 625,
            duration: 5,
            type: 'flight',
            display_name: 'from SYD to GRU by flight',
        },
        {
            id: '2',
            origin: 'SYD',
            destination: 'GRU',
            cost: 2386,
            duration: 7,
            type: 'car',
            display_name: 'from SYD to GRU by car',
        },
    ]

    describe('getCheapestTrip', () => {
        it('should fetch and sort trips by cost', async () => {
            nock(API_URL)
                .get(`?origin=SYD&destination=GRU`)
                .matchHeader('x-api-key', API_KEY)
                .reply(200, mockTripsResponse)

            const result = await adapter.getCheapestTrip('SYD', 'GRU')

            expect(result.success).toBe(true)
            expect(result.data).toHaveLength(2)
            expect(result.data[0].cost).toBeLessThan(result.data[1].cost)
        })
    })

    describe('getFastestTrip', () => {
        it('should fetch and sort trips by duration', async () => {
            nock(API_URL)
                .get('?origin=SYD&destination=GRU')
                .matchHeader('x-api-key', API_KEY)
                .reply(200, mockTripsResponse)

            const result = await adapter.getFastestTrip('SYD', 'GRU')

            expect(result.success).toBe(true)
            expect(result.data).toHaveLength(2)
            expect(result.data[0].duration).toBeLessThan(
                result.data[1].duration,
            )
        })
    })

    describe('error handling', () => {
        it('should handle API errors', async () => {
            nock(API_URL).get('/?origin=SYD&destination=GRU').reply(500)

            const result = await adapter.getFastestTrip('SYD', 'GRU')

            expect(result.success).toBe(false)
            expect(result.data).toEqual([])
            expect(result.error).toBeDefined()
        })

        it('should handle missing API configuration', async () => {
            process.env.API_URL = ''

            const result = await adapter.getFastestTrip('SYD', 'GRU')

            expect(result.success).toBe(false)
            expect(result.error?.message).toContain('Missing API configuration')

        })
    })
})
