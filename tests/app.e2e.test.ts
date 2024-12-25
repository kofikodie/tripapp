import app from '../src/app'
import request from 'supertest'

describe('E2E Test', () => {
    it('should return 200', async () => {
        const response = await request(app).get('/health')
        expect(response.status).toBe(200)
        expect(response.text).toBe('OK')
    })

    it('should return the cheapest trip by cost given origin, destination and a sortBy parameter', async () => {
        const response = await request(app).get(
            '/trips?origin=SYD&destination=GRU&sortBy=cheapest',
        )
        expect(response.status).toBe(200)
        expect(response.body).toEqual([
            {
                cost: 625,
                destination: 'GRU',
                display_name: 'from SYD to GRU by flight',
                duration: 5,
                id: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
                origin: 'SYD',
                type: 'flight',
            },
            {
                cost: 1709,
                destination: 'GRU',
                display_name: 'from SYD to GRU by car',
                duration: 32,
                id: 'd1b89056-ae55-4040-bbd6-0373405705d4',
                origin: 'SYD',
                type: 'car',
            },
            {
                cost: 2386,
                destination: 'GRU',
                display_name: 'from SYD to GRU by car',
                duration: 7,
                id: '00401bc6-ffb5-4340-85a6-e3725bb6dd3e',
                origin: 'SYD',
                type: 'car',
            },
            {
                cost: 3141,
                destination: 'GRU',
                display_name: 'from SYD to GRU by car',
                duration: 20,
                id: 'e6438572-0e0f-49ab-88fc-b05bbbeff1e3',
                origin: 'SYD',
                type: 'car',
            },
            {
                cost: 4236,
                destination: 'GRU',
                display_name: 'from SYD to GRU by train',
                duration: 5,
                id: 'd6bbe5e5-be4d-40d5-9125-cedb57508897',
                origin: 'SYD',
                type: 'train',
            },
        ])
    })

    it('should return the fastest trip by duration given origin, destination and a sortBy parameter', async () => {
        const response = await request(app).get(
            '/trips?origin=SYD&destination=GRU&sortBy=fastest',
        )
        expect(response.status).toBe(200)
        expect(response.body).toEqual([
            {
                cost: 625,
                destination: 'GRU',
                display_name: 'from SYD to GRU by flight',
                duration: 5,
                id: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
                origin: 'SYD',
                type: 'flight',
            },
            {
                cost: 1709,
                destination: 'GRU',
                display_name: 'from SYD to GRU by car',
                duration: 32,
                id: 'd1b89056-ae55-4040-bbd6-0373405705d4',
                origin: 'SYD',
                type: 'car',
            },
            {
                cost: 2386,
                destination: 'GRU',
                display_name: 'from SYD to GRU by car',
                duration: 7,
                id: '00401bc6-ffb5-4340-85a6-e3725bb6dd3e',
                origin: 'SYD',
                type: 'car',
            },
            {
                cost: 3141,
                destination: 'GRU',
                display_name: 'from SYD to GRU by car',
                duration: 20,
                id: 'e6438572-0e0f-49ab-88fc-b05bbbeff1e3',
                origin: 'SYD',
                type: 'car',
            },
            {
                cost: 4236,
                destination: 'GRU',
                display_name: 'from SYD to GRU by train',
                duration: 5,
                id: 'd6bbe5e5-be4d-40d5-9125-cedb57508897',
                origin: 'SYD',
                type: 'train',
            },
        ])
    })

    it('should return 400 when origin is not provided', async () => {
        const response = await request(app).get('/trips?destination=LHR')
        expect(response.status).toBe(400)
    })

    it('should return 400 when destination is not provided', async () => {
        const response = await request(app).get('/trips?origin=LHR')
        expect(response.status).toBe(400)
    })

    it('should return 400 when sortBy is not provided', async () => {
        const response = await request(app).get(
            '/trips?origin=LHR&destination=CDG',
        )
        expect(response.status).toBe(400)
    })
})
