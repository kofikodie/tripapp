import { TripClientInterface, TripInterface } from './ports/TripClientInterface'

export default class ForTripClient implements TripClientInterface {
    async getTrip(
        origin: string,
        destination: string,
        sortBy: string,
    ): Promise<TripInterface> {
        return {
            success: true,
            error: new Error('Not implemented'),
            data: [],
        }
    }
}
