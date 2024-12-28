import app from './app'
import * as dotenv from 'dotenv'
import { ForStoringTripsAdapter } from './driven/adapters/ForStoringTripsAdapter'

dotenv.config()
;(async () => {
    const appPort = process.env.APP_PORT || 8888

    try {
        const forStoringTripsAdapter = ForStoringTripsAdapter.getInstance()
        await forStoringTripsAdapter.connect()
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }

    app.listen(appPort, () => {
        console.log(`App listening on port ${appPort}`)
    })
})()
