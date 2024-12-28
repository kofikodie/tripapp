import { TripInterface } from '../../driven/ports/ForObtainingTrips.Interface'
import { TripStoringValidatorInterface } from './TripStoringValidatorInterface'
import { ValidationResult } from './ValidationResult'

export class TripStoringValidator implements TripStoringValidatorInterface {
    private readonly IATA_CODE_REGEX = /^[A-Z]{3}$/

    validateTripRequest(trip: TripInterface): ValidationResult {
        if (!trip) {
            return {
                isValid: false,
                message: 'Trip object is required',
            }
        }

        console.log('trip', trip.trip_id)
        if (!trip.trip_id) {
            return {
                isValid: false,
                message: `Invalid trip ID: ${trip.trip_id}.`,
            }
        }

        if (!trip.origin || !this.IATA_CODE_REGEX.test(trip.origin)) {
            return {
                isValid: false,
                message: `Invalid origin IATA code: ${trip.origin}`,
            }
        }

        if (!trip.destination || !this.IATA_CODE_REGEX.test(trip.destination)) {
            return {
                isValid: false,
                message: `Invalid destination IATA code: ${trip.destination}`,
            }
        }

        if (typeof trip.cost !== 'number' || trip.cost <= 0) {
            return {
                isValid: false,
                message: 'Cost must be a positive number',
            }
        }

        if (typeof trip.duration !== 'number' || trip.duration <= 0) {
            return {
                isValid: false,
                message: 'Duration must be a positive number',
            }
        }

        if (!trip.type || !['flight', 'train', 'car'].includes(trip.type)) {
            return {
                isValid: false,
                message: 'Type must be one of: flight, train, car',
            }
        }

        if (!trip.display_name || trip.display_name.trim() === '') {
            return {
                isValid: false,
                message: 'Display name is required',
            }
        }

        return { isValid: true }
    }
}
