import app from '../src/app'
import request from 'supertest'

describe('E2E Test', () => {
    it('should return 200', async () => {
        const response = await request(app).get('/health')
        expect(response.status).toBe(200)
    })
})
