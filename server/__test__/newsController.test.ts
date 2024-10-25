import request from 'supertest';
import { app, server } from '../app';
import connectionDb from '../database/conectionDb';

//GET

describe('crud news', () => {

    test('METHOD GET - should return a response with status 200 and type json', async () => {

        const response = await request(app).get('/api/news');

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');

    });

    afterAll((done) => {
        server.close(done);
        connectionDb.close();
    });

//POST
test('METHOD POST - should create a new user', async () => {
    const report = {
        user_id: 1,
        title: "NOTICIA",
        news: "DESCRIPCION DE LA NOTICIA",
        published_at: "2024-10-25T00:00:00.000Z",
        updated_at: "2024-10-25T00:00:00.000Z",
        num_likes: 100,
        image_url: "URL"
    };

    const response = await request(app).post('/api/news').send(report);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(report.title);
        expect(response.body.news).toBe(report.news);
        expect(response.body.num_likes).toBe(report.num_likes);
});

}
)