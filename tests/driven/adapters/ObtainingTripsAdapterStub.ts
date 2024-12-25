import {
    ForObtainingTripsInterface,
    ForObtainingTripsReturnInterface,
} from '../../../src/driven/ports/ForObtainingTrips.Interface'

export default class ObtainingTripsAdapterStub
    implements ForObtainingTripsInterface
{
    async getFastestTrip(
        origin: string,
        destination: string,
    ): Promise<ForObtainingTripsReturnInterface> {
        if (origin === 'ERR' || destination === 'ERR') {
            return {
                success: false,
                error: new Error('Error while fetching trips'),
                data: [],
            }
        }

        return {
            success: true,
            data: [
                {
                    trip_id: '2',
                    origin: 'CDG',
                    destination: 'LHR',
                    duration: 50,
                    cost: 160,
                    type: 'flight',
                    display_name: 'CDG to LHR',
                },
                {
                    trip_id: '1',
                    origin: 'CDG',
                    destination: 'LHR',
                    duration: 100,
                    cost: 80,
                    type: 'flight',
                    display_name: 'CDG to LHR',
                },
            ],
        }
    }

    async getCheapestTrip(
        origin: string,
        destination: string,
    ): Promise<ForObtainingTripsReturnInterface> {
        if (origin === 'ERR' || destination === 'ERR') {
            return {
                success: false,
                error: new Error('Error while fetching trips'),
                data: [],
            }
        }

        return {
            success: true,
            data: [
                {
                    trip_id: '1',
                    origin: 'CDG',
                    destination: 'LHR',
                    duration: 100,
                    cost: 80,
                    type: 'flight',
                    display_name: 'CDG to LHR',
                },
                {
                    trip_id: '2',
                    origin: 'CDG',
                    destination: 'LHR',
                    duration: 50,
                    cost: 160,
                    type: 'flight',
                    display_name: 'CDG to LHR',
                },
            ],
        }
    }
}
