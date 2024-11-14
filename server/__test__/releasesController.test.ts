import request from 'supertest';
import { app, server } from '../app';
import conectionDb from '../database/conectionDb';
import releases from '../models/releasesModels';
import path from 'path';

describe('crud releases', () => {
    // GET all releases
    test('METHOD GET - should return all releases with status 200 and json type', async () => {
        const response = await request(app).get('/api/releases');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

    // GET release by month
    test('METHOD GET - should return releases by month', async () => {
        const month = 'December';
        const response = await request(app).get(`/api/releases/month/${month}`);
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

    // POST new release
    test('METHOD POST - should create a new release', async () => {
        const testImagePath = path.join(__dirname, '../uploads/test-image.jpg');
        
        const response = await request(app)
            .post('/api/releases')
            .field('user_id', '1')
            .field('title', 'Test Game')
            .field('release_date', '2024-12-25')  // Corrigé: release_date au lieu de relese_date
            .field('rating', 'E')
            .field('month', 'December')
            .attach('image_url', testImagePath);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Test Game');
    });

       // PUT update release
       test('METHOD PUT - should update a release', async () => {
        const newRelease = await releases.create({
            user_id: 1,
            title: "Test Game",
            relese_date: "2024-12-25",
            rating: "E",
            image_url: "test.jpg",
            month: "December"
        }) as any;

        const response = await request(app)
            .put(`/api/releases/${newRelease.get('id')}`)
            .send({
                title: "Updated Test Game"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toBe(1);
    });

    // DELETE release
    test('METHOD DELETE - should delete a release', async () => {
        const newRelease = await releases.create({
            user_id: 1,
            title: "Test Game",
            relese_date: "2024-12-25",
            rating: "E",
            image_url: "test.jpg",
            month: "December"
        }) as any;

        const response = await request(app)
            .delete(`/api/releases/${newRelease.get('id')}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toContain('eliminado correctamente');
    })  
});