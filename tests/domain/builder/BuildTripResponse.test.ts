import BuildTripResponse from '../../../src/domain/builder/BuildTripResponse'
import { TripClientResponseInterface } from '../../../src/driven/ports/TripClientInterface'

describe('BuildTripResponse', () => {
    let builder: BuildTripResponse
    let mockTrips: TripClientResponseInterface[]

    beforeEach(() => {
        builder = new BuildTripResponse()
        mockTrips = [
            {
                id: '1',
                origin: 'PAR',
                destination: 'LDN',
                cost: 100,
                duration: 120,
                type: 'train',
                display_name: 'Train to London',
            },
            {
                id: '2',
                origin: 'LDN',
                destination: 'BER',
                cost: 80,
                duration: 180,
                type: 'train',
                display_name: 'Train to Berlin',
            },
            {
                id: '3',
                origin: 'BER',
                destination: 'PAR',
                cost: 150,
                duration: 90,
                type: 'train',
                display_name: 'Train to Paris',
            },
        ]
    })

    it('should sort trips by cost when sortBy is "cheap"', () => {
        const result = builder.build(mockTrips, 'cheapest')

        expect(result).toEqual([
            {
                id: '2',
                origin: 'LDN',
                destination: 'BER',
                cost: 80,
                duration: 180,
                type: 'train',
                display_name: 'Train to Berlin',
            },
            {
                id: '1',
                origin: 'PAR',
                destination: 'LDN',
                cost: 100,
                duration: 120,
                type: 'train',
                display_name: 'Train to London',
            },
            {
                id: '3',
                origin: 'BER',
                destination: 'PAR',
                cost: 150,
                duration: 90,
                type: 'train',
                display_name: 'Train to Paris',
            },
        ])
    })

    it('should sort trips by duration when sortBy is not "cheap"', () => {
        const result = builder.build(mockTrips, 'fastest')

        expect(result).toEqual([
            {
                id: '3',
                origin: 'BER',
                destination: 'PAR',
                cost: 150,
                duration: 90,
                type: 'train',
                display_name: 'Train to Paris',
            },
            {
                id: '1',
                origin: 'PAR',
                destination: 'LDN',
                cost: 100,
                duration: 120,
                type: 'train',
                display_name: 'Train to London',
            },
            {
                id: '2',
                origin: 'LDN',
                destination: 'BER',
                cost: 80,
                duration: 180,
                type: 'train',
                display_name: 'Train to Berlin',
            },
        ])
    })
})
