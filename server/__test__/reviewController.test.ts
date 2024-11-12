// reviewRoutes.test.ts
import request from 'supertest';
import { app, server } from '../app'; // Asegúrate de que apunte correctamente al archivo donde exportas 'app'
import conectionDb from '../database/conectionDb';

// Conexión a la base de datos de prueba
beforeAll(async () => {
    await conectionDb.sync();
});

afterAll(async () => {
    await conectionDb.close();
});

// Test de rutas de /api/reviews
describe('Test de rutas de /api/reviews', () => {

    // Test para crear una nueva review
    it('Debe crear una nueva review', async () => {
        const newReview = {
            title: 'Nueva Review',
            review: 'Este es el contenido de la nueva review',
            author: 'Autor de Prueba',
            rating: 4 ,// Valor entre 1 y 5 solo si rol es 'admin'
            rol: 'admin',
            avatar: './imagen.png' // Puedes cambiar a 'user' si prefieres
        };

        const response = await request(app).post('/api/reviews').send(newReview);
        console.log(response.body); // Para ver el mensaje de error si falla
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id'); // Asumiendo que el objeto creado devuelve un ID
        expect(response.body.title).toBe(newReview.title);
    });

    // Test para actualizar una review existente
    it('Debe actualizar una review existente', async () => {
        // Primero crea una review temporal para actualizarla
        const createdReview = await request(app).post('/api/reviews').send({
            user_id: 1,
            rol: 'admin',
            title: 'Review temporal',
            review: 'Contenido de la review temporal',
            author: 'Autor temporal',
            rating: 3
        });
        const reviewId = createdReview.body.id;

        const updateData = {
            title: 'Review Actualizada',
            review: 'Contenido actualizado de la review',
            author: 'Autor actualizado',
            rating: 5
        };

        const response = await request(app).put(`/api/reviews/${reviewId}`).send(updateData);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updateData.title);
    });

    // Test para eliminar una review existente
    it('Debe eliminar una review existente', async () => {
        // Primero crea una review temporal para eliminarla
        const createdReview = await request(app).post('/api/reviews').send({
            user_id: 1,
            rol: 'admin',
            title: 'Review para eliminar',
            review: 'Contenido de la review para eliminar',
            author: 'Autor a eliminar',
            rating: 4
        });
        const reviewId = createdReview.body.id;

        const response = await request(app).delete(`/api/reviews/${reviewId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Review eliminada con éxito');
    });
});

// Cerrar el servidor después de todos los tests
afterAll(() => {
    server.close();
});
