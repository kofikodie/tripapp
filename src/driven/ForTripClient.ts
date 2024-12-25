import axios from 'axios'
import { TripClientInterface, TripInterface } from './ports/TripClientInterface'
import dotenv from 'dotenv'

dotenv.config()

export default class ForTripClient implements TripClientInterface {
    async getTrip(
        origin: string,
        destination: string,
        sortBy: string,
    ): Promise<TripInterface> {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.API_URL}?origin=${origin}&destination=${destination}&sortBy=${sortBy}`,
            headers: {
                'x-api-key': process.env.API_KEY,
            },
        }

        try {
            const response = await axios(config)

            return {
                success: true,
                data: response.data,
            }
        } catch (error) {
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error
                        : new Error('Unknown error while fetching trips'),
                data: [],
            }
        }
    }
}
