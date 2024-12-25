import { TripClientInterface } from '../../src/driven/ports/TripClientInterface'
import { TripInterface } from '../../src/driven/ports/TripClientInterface'

export default class ForTripClientStub implements TripClientInterface {
    async getTrip(
        origin: string,
        destination: string,
        sortBy: string,
    ): Promise<TripInterface> {
        if (destination === 'ERR' || origin === 'ERR' || sortBy === 'ERR') {
            return Promise.resolve({
                success: false,
                error: new Error('Error getting trips'),
                data: [],
            })
        }

        return Promise.resolve({
            success: true,
            data: [
                {
                    origin: 'SYD',
                    destination: 'GRU',
                    cost: 625,
                    duration: 5,
                    type: 'flight',
                    id: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
                    display_name: 'from SYD to GRU by flight',
                },
                {
                    origin: 'SYD',
                    destination: 'GRU',
                    cost: 2386,
                    duration: 7,
                    type: 'car',
                    id: '00401bc6-ffb5-4340-85a6-e3725bb6dd3e',
                    display_name: 'from SYD to GRU by car',
                },
                {
                    origin: 'SYD',
                    destination: 'GRU',
                    cost: 3141,
                    duration: 20,
                    type: 'car',
                    id: 'e6438572-0e0f-49ab-88fc-b05bbbeff1e3',
                    display_name: 'from SYD to GRU by car',
                },
                {
                    origin: 'SYD',
                    destination: 'GRU',
                    cost: 4236,
                    duration: 5,
                    type: 'train',
                    id: 'd6bbe5e5-be4d-40d5-9125-cedb57508897',
                    display_name: 'from SYD to GRU by train',
                },
                {
                    origin: 'SYD',
                    destination: 'GRU',
                    cost: 1709,
                    duration: 32,
                    type: 'car',
                    id: 'd1b89056-ae55-4040-bbd6-0373405705d4',
                    display_name: 'from SYD to GRU by car',
                },
            ],
        })
    }
}
