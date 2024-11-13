import request from 'supertest';
import { app, server } from '../app';
import connectionDb from '../database/conectionDb';


// Función para crear un usuario
const createUser = async () => {
    const response = await request(app).post('/api/users').send({
        id: 1,
        rol: "user",
        name: "Test User",
        email: "testuser@example.com",
        password: "testpassword",
        avatar: "URL",
        created_at: "2024-10-25T00:00:00.000Z",
        last_login: "2024-10-25T00:00:00.000Z",
        status: "active",
        bio: "test bio",
        birth_date: "2024-10-25T00:00:00.000Z",
    });
    return response.body;
};

// Función para crear una revisión
const createReview = async (reviewData = {}) => {
    const defaultData = {
        user_id: 1,  // El usuario debe existir primero
        rol: "test",
        title: "test",
        review: "test",
        published_at: "2024-10-25T00:00:00.000Z",
        updated_at: "2024-10-25T00:00:00.000Z",
        image_url: "URL",
        author: "test",
        num_likes: 100,
        rating: 4,
    };
    const data = { ...defaultData, ...reviewData };
    const response = await request(app).post('/api/reviews').send(data);
    return response.body;
};

describe('CRUD de reviews', () => {
    // Antes de cada conjunto de pruebas, se crea el usuario
    beforeEach(async () => {
        await createUser(); // Crear usuario solo una vez
    });

    // GET ALL REVIEWS
    test('GET - Debería retornar todas las reviews con status 200 y formato JSON', async () => {
        const response = await request(app).get('/api/reviews');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

    // GET REVIEW BY ID
    test('GET BY ID - Debería obtener una review por ID', async () => {
        const newReview = await createReview(); // Crear una review para obtener
        const reviewId = newReview.id;

        const getResponse = await request(app).get(`/api/reviews/${reviewId}`);
        expect(getResponse.statusCode).toBe(200);

        // Verificar los datos de la respuesta
        Object.keys(newReview).forEach((key) => {
            expect(getResponse.body[key]).toBe(newReview[key]);
        });
    });

    // POST REVIEW
    test('POST - Debería crear una nueva review', async () => {
        const newReview = {
            user_id: 1,  // Asegúrate de que el usuario existe antes de crear la review
            rol: "user",
            title: "unique-title",
            review: "unique-review",
            published_at: "2024-10-25T00:00:00.000Z",
            updated_at: "2024-10-25T00:00:00.000Z",
            image_url: "URL",
            author: "new-author",
            num_likes: 200,
            rating: 5,
        };

        const response = await request(app).post('/api/reviews').send(newReview);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toEqual(newReview.title);
        expect(response.body.review).toBe(newReview.review);
        expect(response.body.id).toBeDefined();
    });

    // DELETE REVIEW
    test('DELETE - Debería eliminar una review por ID', async () => {
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
    test('PUT - Debería actualizar la review por ID', async () => {
        const newReview = await createReview();
        const reviewId = newReview.id;

        const updatedReview = {
            title: "test-updated-title",
            review: "test-updated-review",
        };

        const updateResponse = await request(app).put(`/api/reviews/${reviewId}`).send(updatedReview);
        expect(updateResponse.statusCode).toBe(200);

        // Verificar que la respuesta contenga los datos actualizados
        expect(updateResponse.body.title).toBe(updatedReview.title);
        expect(updateResponse.body.review).toBe(updatedReview.review);
        expect(updateResponse.body.user_id).toBe(newReview.user_id); // Confirmamos que el user_id no cambió
    });
});

// Cerrar el servidor y la base de datos después de todas las pruebas
afterAll(async () => {
    server.close();  // Cierra el servidor
    await connectionDb.close();  // Cierra la conexión a la base de datos
});
