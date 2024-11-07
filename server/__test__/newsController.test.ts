import request from 'supertest';
import { app, server } from '../app';
import connectionDb from '../database/conectionDb';
import NewsModel from '../models/newsModel';

describe('crud news', () => {
    //GET
    test('METHOD GET - should return a response with status 200 and type json', async () => {
        const response = await request(app).get('/api/news');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

    //POST
    test('METHOD POST - should create a new user', async () => {
        const report = {
            user_id: 1,
            title: "test",
            news: "test",
            published_at: "2024-10-25T00:00:00.000Z",
            updated_at: "2024-10-25T00:00:00.000Z",
            num_likes: 100,
            image_url: "URL",
            image2_url: "URL"
        };

        const response = await request(app).post('/api/news').send(report);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toEqual(report.title);
        expect(response.body.news).toBe(report.news);
        expect(response.body.num_likes).toBe(report.num_likes);
    });

    //TDD DELETE
    test('METHOD DELETE - should delete a user', async () => {
        const newToDelete = await NewsModel.create({
            user_id: 1,
            title: "test",
            news: "test",
            published_at: "2024-10-25T00:00:00.000Z",
            updated_at: "2024-10-25T00:00:00.000Z",
            num_likes: 100,
            image_url: "test",
            image2_url: "test"
        });

        const id = newToDelete?.get('id')?.toString();
        const response = await request(app).delete(`/api/news/${id}`).set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

//PUT
    test("METHOD PUT - should update the new", async () => {
        const newForUpdate = await NewsModel.create({
            user_id: 1,
            title: "test",
            news: "test",
            published_at: "2024-10-25T00:00:00.000Z",
            updated_at: "2024-10-25T00:00:00.000Z",
            num_likes: 100,
            image_url: "test",
            image2_url: "test"
        });

        const id = newForUpdate?.get('id')?.toString();
        const response = await request(app).put(`/api/news/${id}`).send(newForUpdate).set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

    afterEach(async () => {
        await NewsModel.destroy({
            where: { title: 'test' }
        });
    });

    afterAll((done) => {
        server.close(done);
        connectionDb.close();
    });
});