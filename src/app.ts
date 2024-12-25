import express, { Request, Response } from 'express'
import { TripsParamsInterface } from './driving/ports/ForConfiguringTripsParams.Interface'
import { LoggerService } from './utils/logger/LoggerService'
import ObtainingTripsAdapter from './driven/adapters/ObtainingTripsAdapter'
import { TripConfigurator } from './domain/TripConfigurator'
import { TripValidator } from './domain/validator/TripValidator'

const app = express()

app.get('/health', (req: Request, res: Response) => {
    res.send('OK')
})

app.get(
    '/trips',
    async (
        req: Request<unknown, unknown, unknown, TripsParamsInterface>,
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

export default app
