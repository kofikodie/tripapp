export interface ForObtainingTripsInterface {
    getCheapestTrip(
        origin: string,
        destination: string,
    ): Promise<ForObtainingTripsReturnInterface>

    getFastestTrip(
        origin: string,
        destination: string,
    ): Promise<ForObtainingTripsReturnInterface>
}

export interface ForObtainingTripsReturnInterface {
    success: boolean
    error?: Error
    data: TripInterface[] | []
}

export interface TripInterface {
    origin: string
    destination: string
    cost: number
    type: string
    duration: number
    trip_id: string
    display_name: string
}
