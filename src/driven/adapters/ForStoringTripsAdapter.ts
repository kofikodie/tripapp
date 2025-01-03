import { MongoClient, Db, Collection } from 'mongodb'
import { ForStoringTripsInterface } from '../ports/ForStoringTrips.Interface'
import { TripInterface } from '../ports/ForObtainingTrips.Interface'
import dotenv from 'dotenv'

dotenv.config()

export class ForStoringTripsAdapter implements ForStoringTripsInterface {
    private static instance: ForStoringTripsAdapter
    private client: MongoClient
    private db: Db
    private collection: Collection<TripInterface>

    private constructor() {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
        this.client = new MongoClient(uri)
        this.db = this.client.db(process.env.MONGODB_DB || 'tripDB')
        this.collection = this.db.collection<TripInterface>('trips')
    }

    public static getInstance(): ForStoringTripsAdapter {
        if (!ForStoringTripsAdapter.instance) {
            ForStoringTripsAdapter.instance = new ForStoringTripsAdapter()
        }
        return ForStoringTripsAdapter.instance
    }

    async saveTrip(
        trip: TripInterface,
    ): Promise<{ success: boolean; message: string }> {
        try {
            await this.collection.insertOne(trip)
            return { success: true, message: 'Trip saved successfully' }
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error while saving trip',
            }
        }
    }

    async getTrips(): Promise<TripInterface[]> {
        try {
            return await this.collection.find().toArray()
        } catch (error) {
            console.error('Failed to retrieve trips:', {
                error: {
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Unknown error while retrieving trips',
                },
            })
            return []
        }
    }

    async deleteTrip(
        trip_id: string,
    ): Promise<{ success: boolean; message: string }> {
        try {
            const result = await this.collection.deleteOne({ trip_id })
            return {
                success: true,
                message:
                    result.deletedCount === 1
                        ? 'Trip deleted successfully'
                        : 'Trip not found',
            }
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error while deleting trip',
            }
        }
    }

    async deleteAllTrips(): Promise<void> {
        await this.collection.deleteMany({})
    }

    async close(): Promise<void> {
        await this.client.close()
    }
}
