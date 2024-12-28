import { TripInterface } from '../driven/ports/ForObtainingTrips.Interface'
import { TripStoringValidatorInterface } from './validator/TripStoringValidatorInterface'
import { ForStoringTripsInterface } from '../driven/ports/ForStoringTrips.Interface'
import { LoggerInterface } from '../utils/logger/LoggerInterface'

export class TripStorageConfigurator {
    private storageAdapter: ForStoringTripsInterface
    private validator: TripStoringValidatorInterface
    private logger: LoggerInterface
    constructor(
        storageAdapter: ForStoringTripsInterface,
        validator: TripStoringValidatorInterface,
        logger: LoggerInterface,
    ) {
        this.storageAdapter = storageAdapter
        this.validator = validator
        this.logger = logger
    }

    async saveTrip(
        trip: TripInterface,
    ): Promise<{ success: boolean; message: string }> {
        const validationResult = this.validator.validateTripRequest(trip)
        if (!validationResult.isValid) {
            this.logger.error('Error validating trip request', {
                trip,
                error: validationResult.message,
            })

            return {
                success: false,
                message: validationResult.message || 'Invalid trip request',
            }
        }

        return await this.storageAdapter.saveTrip(trip)
    }

    async getTrips(): Promise<TripInterface[]> {
        // You can add additional business logic or filtering here
        return await this.storageAdapter.getTrips()
    }
}
