import request from 'supertest';
import { app, server } from '../app';
import connectionDb from '../database/conectionDb';

const createReview = async (reviewData = {}) => {
    const defaultData = {
        user_id: 1,
        rol: "test",
        title: "test",
        review: "test",
        published_at: "2024-10-25T00:00:00.000Z",
        updated_at: "2024-10-25T00:00:00.000Z",
        image_url: "URL",
        author: "test",
        rating: 4,
        num_likes: 100,
    };
    const data = { ...defaultData, ...reviewData };
    const response = await request(app).post('/api/reviews').send(data);
    return response.body;
};

describe('crud reviews', () => {
    // GET ALL REVIEWS
    test('METHOD GET - should return a response with status 200 and type json', async () => {
        const response = await request(server).get('/api/reviews');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

    // GET REVIEW BY ID
    test('METHOD GET BY ID - Should get a review by ID', async () => {
        const newReview = await createReview();
        const reviewId = newReview.id;

        const getResponse = await request(app).get(`/api/reviews/${reviewId}`);
        expect(getResponse.statusCode).toBe(200);

        // Verificar los datos de la respuesta
        expect(getResponse.body.title).toBe(newReview.title);
        expect(getResponse.body.review).toBe(newReview.review);
        expect(getResponse.body.published_at).toBe(newReview.published_at);
        expect(getResponse.body.updated_at).toBe(newReview.updated_at);
        expect(getResponse.body.image_url).toBe(newReview.image_url);
        expect(getResponse.body.author).toBe(newReview.author);
        expect(getResponse.body.rating).toBe(newReview.rating);
        expect(getResponse.body.num_likes).toBe(newReview.num_likes);
        expect(getResponse.body.user_id).toBe(newReview.user_id);
        expect(getResponse.body.rol).toBe(newReview.rol);
        expect(getResponse.body.id).toBe(reviewId);
    });

    // POST REVIEW
    test('METHOD POST - should create a new review', async () => {
        const newReview = {
            title: "new-test-title",
            review: "new-test-review"
        };

        const response = await request(app).post('/api/reviews').send(newReview);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toEqual(newReview.title);
        expect(response.body.review).toBe(newReview.review);
        expect(response.body.id).toBeDefined();
    });

    // DELETE REVIEW
    test('METHOD DELETE - should delete a review by ID', async () => {
        const newReview = await createReview();
        const reviewId = newReview.id;

        const deleteResponse = await request(app).delete(`/api/reviews/${reviewId}`);
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.message).toBe('Review deleted successfully');

        // Confirmar que la review fue eliminada
        const getResponse = await request(app).get(`/api/reviews/${reviewId}`);
        expect(getResponse.statusCode).toBe(404);
    });

    // PUT UPDATE REVIEW
    test('METHOD PUT - should update the review by ID', async () => {
        const newReview = await createReview();
        const reviewId = newReview.id;

        const updatedReview = {
            title: "test-updated-title",
            review: "test-updated-review"
        };

        const updateResponse = await request(app).put(`/api/reviews/${reviewId}`).send(updatedReview);
        expect(updateResponse.statusCode).toBe(200);

        // Verificar que la respuesta contenga los datos actualizados
        expect(updateResponse.body.title).toBe(updatedReview.title);
        expect(updateResponse.body.review).toBe(updatedReview.review);
        expect(updateResponse.body.user_id).toBe(newReview.user_id); // Confirmamos que el user_id no cambió
    });

    // Cerrar el servidor y la base de datos después de las pruebas
    afterAll(async () => {
        server.close();  // Cierra el servidor
        await connectionDb.close();  // Cierra la conexión a la base de datos
    });
});


