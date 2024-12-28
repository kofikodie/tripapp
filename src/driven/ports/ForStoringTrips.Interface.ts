import { TripInterface } from './ForObtainingTrips.Interface'

export interface ForStoringTripsInterface {
    connect(): Promise<void>
    saveTrip(
        trip: TripInterface,
    ): Promise<{ success: boolean; message: string }>
    getTrips(): Promise<TripInterface[]>
    close(): Promise<void>
}
