import express, { Request, Response } from 'express'
import { TripsParamsInterface } from './driving/ports/TripsParamsInterface'
import { LoggerService } from './utils/logger/LoggerService'
import ForTripClient from './driven/ForTripClient'
import { TripConfigurator } from './domain/TripConfigurator'
import BuildTripResponse from './domain/builder/BuildTripResponse'
import { TripValidator } from './domain/validator/TripValidator'

const app = express()

app.get('/health', (req: Request, res: Response) => {
    res.send('OK')
})

app.get(
    '/trips',
    async (req: Request<{}, {}, {}, TripsParamsInterface>, res: Response) => {
        const { origin, destination, sortBy } = req.query

        const tripClient = new ForTripClient()
        const buildTripResponse = new BuildTripResponse()
        const logger = LoggerService.getInstance()
        const tripValidator = new TripValidator()
        const tripConfigurator = new TripConfigurator(
            tripClient,
            buildTripResponse,
            tripValidator,
            logger,
        )
        const trip = await tripConfigurator.getTrips(
            origin,
            destination,
            sortBy,
        )

        res.status(trip.status).send(trip.data)
    },
)

export default app
