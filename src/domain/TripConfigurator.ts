import BuildTripResponse from './builder/BuildTripResponse'
import {
    TripClientInterface,
    TripClientResponseInterface,
} from '../driven/ports/TripClientInterface'
import { BuildTripResponseInterface } from './builder/BuildTripResponseInterface'
import { TripValidatorInterface } from './validator/TripValidatorInterface'
import { LoggerInterface } from '../utils/logger/LoggerInterface'

export class TripConfigurator {
    private tripClient: TripClientInterface
    private buildTripResponse: BuildTripResponseInterface
    private tripValidator: TripValidatorInterface
    private logger: LoggerInterface

    constructor(
        tripClient: TripClientInterface,
        buildTripResponse: BuildTripResponse,
        tripValidator: TripValidatorInterface,
        logger: LoggerInterface,
    ) {
        this.tripClient = tripClient
        this.buildTripResponse = buildTripResponse
        this.tripValidator = tripValidator
        this.logger = logger
    }

    async getTrips(
        origin: string,
        destination: string,
        sortBy: string,
    ): Promise<{
        status: number
        data: TripClientResponseInterface[]
        message?: string
    }> {
        const validationResult = this.tripValidator.validateTripRequest(
            origin,
            destination,
            sortBy,
        )

        if (!validationResult.isValid) {
            this.logger.error(`Error validating trip request`, {
                origin,
                destination,
                sortBy,
                error: validationResult.message,
            })

            return {
                status: 400,
                data: [],
                message: validationResult.message,
            }
        }

        const tripsResponse = await this.tripClient.getTrip(
            origin,
            destination,
            sortBy,
        )

        if (!tripsResponse.success) {
            this.logger.error(`Error getting trips`, {
                origin,
                destination,
                sortBy,
                error: {
                    message: tripsResponse.error?.message,
                    stack: tripsResponse.error?.stack,
                    name: tripsResponse.error?.name,
                },
            })

            return {
                status: 400,
                data: [],
                message: tripsResponse.error?.message,
            }
        }

        const trip = this.buildTripResponse.build(tripsResponse.data, sortBy)
        return {
            status: 200,
            data: trip,
        }
    }
}
