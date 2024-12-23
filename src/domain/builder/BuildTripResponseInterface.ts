import { TripClientResponseInterface } from '../../driven/ports/TripClientInterface'

export interface BuildTripResponseInterface {
    build(
        tripsResponse: TripClientResponseInterface[],
        sortBy: string,
    ): TripClientResponseInterface[]
}
