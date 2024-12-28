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
        expect(response.body).toEqual({
            data: [
                {
                    cost: 625,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by flight',
                    duration: 5,
                    trip_id: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
                    origin: 'SYD',
                    type: 'flight',
                },
                {
                    cost: 1709,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by car',
                    duration: 32,
                    trip_id: 'd1b89056-ae55-4040-bbd6-0373405705d4',
                    origin: 'SYD',
                    type: 'car',
                },
                {
                    cost: 2386,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by car',
                    duration: 7,
                    trip_id: '00401bc6-ffb5-4340-85a6-e3725bb6dd3e',
                    origin: 'SYD',
                    type: 'car',
                },
                {
                    cost: 3141,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by car',
                    duration: 20,
                    trip_id: 'e6438572-0e0f-49ab-88fc-b05bbbeff1e3',
                    origin: 'SYD',
                    type: 'car',
                },
                {
                    cost: 4236,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by train',
                    duration: 5,
                    trip_id: 'd6bbe5e5-be4d-40d5-9125-cedb57508897',
                    origin: 'SYD',
                    type: 'train',
                },
            ],
        })
    })

    it('should return the fastest trip by duration given origin, destination and a sortBy parameter', async () => {
        const response = await request(app).get(
            '/trips?origin=SYD&destination=GRU&sortBy=fastest',
        )
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            data: [
                {
                    cost: 625,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by flight',
                    duration: 5,
                    trip_id: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
                    origin: 'SYD',
                    type: 'flight',
                },
                {
                    cost: 4236,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by train',
                    duration: 5,
                    trip_id: 'd6bbe5e5-be4d-40d5-9125-cedb57508897',
                    origin: 'SYD',
                    type: 'train',
                },
                {
                    cost: 2386,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by car',
                    duration: 7,
                    trip_id: '00401bc6-ffb5-4340-85a6-e3725bb6dd3e',
                    origin: 'SYD',
                    type: 'car',
                },
                {
                    cost: 3141,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by car',
                    duration: 20,
                    trip_id: 'e6438572-0e0f-49ab-88fc-b05bbbeff1e3',
                    origin: 'SYD',
                    type: 'car',
                },
                {
                    cost: 1709,
                    destination: 'GRU',
                    display_name: 'from SYD to GRU by car',
                    duration: 32,
                    trip_id: 'd1b89056-ae55-4040-bbd6-0373405705d4',
                    origin: 'SYD',
                    type: 'car',
                },
            ],
        })
    })

    it('should save a trip to the database', async () => {
        const response = await request(app).post('/api/save/trip').send({
            trip_id: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
            origin: 'SYD',
            destination: 'GRU',
            cost: 625,
            duration: 5,
            type: 'flight',
            display_name: 'from SYD to GRU by flight',
        })

        expect(response.status).toBe(201)
        expect(response.body).toEqual({
            success: true,
            message: 'Trip saved successfully',
        })
    })

    it('should return all the saved trips', async () => {
        //save a trip
        await request(app).post('/api/save/trip').send({
            trip_id: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
            origin: 'SYD',
            destination: 'GRU',
            cost: 625,
            duration: 5,
            type: 'flight',
            display_name: 'from SYD to GRU by flight',
        })

        //get all the trips and check if the trip is there
        const response = await request(app).get('/api/trips')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([
            {
                trip_id: 'a749c866-7928-4d08-9d5c-a6821a583d1a',
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
