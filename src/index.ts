import app from './app'
import * as dotenv from 'dotenv'

dotenv.config()
;(async () => {
    const appPort = process.env.APP_PORT || 8888

    app.listen(appPort, () => {
        console.log(`App listening on port ${appPort}`)
    })
})()
