import axios, { AxiosRequestConfig } from 'axios'
import {
    ForObtainingTripsInterface,
    ForObtainingTripsReturnInterface,
    TripInterface,
} from '../ports/ForObtainingTrips.Interface'
import dotenv from 'dotenv'

dotenv.config()

export default class ObtainingTripsAdapter
    implements ForObtainingTripsInterface
{
    private getConfig(origin: string, destination: string): AxiosRequestConfig {
        if (!process.env.API_URL || !process.env.API_KEY) {
            throw new Error('Missing API configuration')
        }

        return {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.API_URL}?origin=${origin}&destination=${destination}`,
            headers: {
                'x-api-key': process.env.API_KEY,
            },
        }
    }

    private async fetchTrips(
        origin: string,
        destination: string,
        sortFn: (a: TripInterface, b: TripInterface) => number,
    ): Promise<ForObtainingTripsReturnInterface> {
        try {
            const config = this.getConfig(origin, destination)
            const response = await axios.request<TripInterface[]>(config)

            return {
                success: true,
                data: response.data.sort(sortFn),
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Unknown error while fetching trips'

            return {
                success: false,
                error: new Error(errorMessage),
                data: [],
            }
        }
    }

    async getCheapestTrip(
        origin: string,
        destination: string,
    ): Promise<ForObtainingTripsReturnInterface> {
        return this.fetchTrips(origin, destination, (a, b) => a.cost - b.cost)
    }

    async getFastestTrip(
        origin: string,
        destination: string,
    ): Promise<ForObtainingTripsReturnInterface> {
        return this.fetchTrips(
            origin,
            destination,
            (a, b) => a.duration - b.duration,
        )
    }
}
