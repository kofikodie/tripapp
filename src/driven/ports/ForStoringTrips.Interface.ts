import { TripInterface } from './ForObtainingTrips.Interface'

export interface ForStoringTripsInterface {
    connect(): Promise<void>
    saveTrip(
        trip: TripInterface,
    ): Promise<{ success: boolean; message: string }>
    getTrips(): Promise<TripInterface[]>
    deleteTrip(trip_id: string): Promise<{ success: boolean; message: string }>
    deleteAllTrips(): Promise<void> //For testing purposes
    close(): Promise<void>
}