import {
    ForObtainingTripsInterface,
    ForObtainingTripsReturnInterface,
    TripInterface,
} from '../driven/ports/ForObtainingTrips.Interface'
import { TripValidatorInterface } from './validator/TripValidatorInterface'
import { LoggerInterface } from '../utils/logger/LoggerInterface'

export class TripConfigurator {
    private forObtainingTrips: ForObtainingTripsInterface
    private tripValidator: TripValidatorInterface
    private logger: LoggerInterface

    constructor(
        forObtainingTrips: ForObtainingTripsInterface,
        tripValidator: TripValidatorInterface,
        logger: LoggerInterface,
    ) {
        this.forObtainingTrips = forObtainingTrips
        this.tripValidator = tripValidator
        this.logger = logger
    }

    async getTrips(
        origin: string,
        destination: string,
        sortBy: string,
    ): Promise<{
        status: number
        data: TripInterface[]
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

        let tripsResponse: ForObtainingTripsReturnInterface

        if (sortBy === 'cheapest') {
            tripsResponse = await this.forObtainingTrips.getCheapestTrip(
                origin,
                destination,
            )
        } else {
            tripsResponse = await this.forObtainingTrips.getFastestTrip(
                origin,
                destination,
            )
        }

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

        return {
            status: 200,
            data: tripsResponse.data,
        }
    }
}
