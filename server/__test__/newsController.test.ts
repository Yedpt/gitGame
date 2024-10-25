import request from 'supertest';
import { app, server } from '../app';
import connectionDb from '../database/conectionDb';

//GET

describe('crud news', () => {

    test('METHOD GET - should return a response with status 200 and type json', async () => {

        const response = await request(app).get('/news');

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');

    });

    afterAll((done) => {
        server.close(done);
        connectionDb.close();
    });
}
)