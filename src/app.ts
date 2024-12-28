import express, { Request, Response } from 'express'
import { ForTripsParamsInterface } from './driving/ports/ForConfiguringTripsParams.Interface'
import { LoggerService } from './utils/logger/LoggerService'
import ObtainingTripsAdapter from './driven/adapters/ForObtainingTripsAdapter'
import { TripConfigurator } from './domain/TripConfigurator'
import { TripValidator } from './domain/validator/TripValidator'
import { ForStoringTripsAdapter } from './driven/adapters/ForStoringTripsAdapter'
import { TripInterface } from './driven/ports/ForObtainingTrips.Interface'
import { TripStorageConfigurator } from './domain/TripStorageConfigurator'
import { TripStoringValidator } from './domain/validator/TripStoringValidator'

const app = express()

app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
    res.send('OK')
})

app.get(
    '/trips',
    async (
        req: Request<unknown, unknown, unknown, ForTripsParamsInterface>,
        res: Response,
    ) => {
        const { origin, destination, sortBy } = req.query

        const tripClient = new ObtainingTripsAdapter()
        const logger = LoggerService.getInstance()
        const tripValidator = new TripValidator()
        const tripConfigurator = new TripConfigurator(
            tripClient,
            tripValidator,
            logger,
        )
        const tripsResponse = await tripConfigurator.getTrips(
            origin,
            destination,
            sortBy,
        )

        res.status(tripsResponse.status).send({
            data: tripsResponse.data,
            message: tripsResponse.message,
        })
    },
)

app.post(
    '/save/trip',
    async (req: Request<unknown, unknown, TripInterface>, res: Response) => {
        const trip: TripInterface = req.body

        const tripStorageAdapter = ForStoringTripsAdapter.getInstance()
        const logger = LoggerService.getInstance()
        const tripStoringValidator = new TripStoringValidator()

        const tripStorageConfigurator = new TripStorageConfigurator(
            tripStorageAdapter,
            tripStoringValidator,
            logger,
        )

        const result = await tripStorageConfigurator.saveTrip(trip)
        res.status(result.success ? 201 : 500).json(result)
    },
)

export default app
