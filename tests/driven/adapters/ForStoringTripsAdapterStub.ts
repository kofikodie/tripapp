import { TripInterface } from '../../../src/driven/ports/ForObtainingTrips.Interface'
import { ForStoringTripsInterface } from '../../../src/driven/ports/ForStoringTrips.Interface'

export default class ForStoringTripsAdapterStub
    implements ForStoringTripsInterface
{
    async saveTrip(
        trip: TripInterface,
    ): Promise<{ success: boolean; message: string }> {
        if (trip.trip_id === 'ERR') {
            return { success: false, message: 'Error while saving trip' }
        }
        return { success: true, message: 'Trip saved successfully' }
    }

    async getTrips(): Promise<TripInterface[]> {
        return []
    }

    async close(): Promise<void> {
        return
    }

    async connect(): Promise<void> {
        return
    }
}
