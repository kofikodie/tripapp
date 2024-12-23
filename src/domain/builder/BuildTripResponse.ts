import { TripClientResponseInterface } from '../../driven/ports/TripClientInterface'
import { BuildTripResponseInterface } from './BuildTripResponseInterface'

export default class BuildTripResponse implements BuildTripResponseInterface {
    build(tripsResponse: TripClientResponseInterface[], sortBy: string) {
        if (sortBy === 'cheapest') {
            return tripsResponse.sort((a, b) => a.cost - b.cost)
        }
        return tripsResponse.sort((a, b) => a.duration - b.duration)
    }
}
