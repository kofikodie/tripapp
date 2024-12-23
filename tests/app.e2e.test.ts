import app from '../src/app'
import request from 'supertest'

describe('E2E Test', () => {
    it('should return 200', async () => {
        const response = await request(app).get('/health')
        expect(response.status).toBe(200)
        expect(response.text).toBe('OK')
    })

    it('should return the fastest trip by duration given origin, destination and a sortBy parameter', async () => {
        const response = await request(app).get(
            '/trips?origin=PAR&destination=LDN&sortBy=cheapest',
        )
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('duration')
    })
})
