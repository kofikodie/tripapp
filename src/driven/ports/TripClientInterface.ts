
export interface TripClientInterface {
    getTrip(
        origin: string,
        destination: string,
        sortBy: string,
    ): Promise<TripInterface>
}

export interface TripInterface {
    success: boolean
    error?: Error
    data: TripClientResponseInterface[] | []
}

export interface TripClientResponseInterface {
    origin: string
    destination: string
    cost: number
    type: string
    duration: number
    id: string
    display_name: string
}
