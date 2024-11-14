import request from 'supertest';
import { app, server } from '../app';  
import connectionDb from '../database/conectionDb';
import UserModel from '../models/userModel';
import { status } from '../interfaces/userInterface';

beforeAll(async () => {
    await connectionDb.sync({ force: true });
    await UserModel.create({
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
        birth_date: new Date('1992-02-02'),
        password: 'Password123', 
        bio: 'Test bio',
        avatar: 'avatar.png',
        rol: 'user',
        created_at: new Date(),
        status: status.active,
    });
});

// Test de rutas de /api/reviews
describe('Test de rutas de /api/reviews', () => {

    // Test para crear una nueva review
    it('Debe crear una nueva review', async () => {
        const newReview = {
            user_id: 1,
            rol: 'admin',  
            title: 'Nueva Review',
            review: 'Este es el contenido de la nueva review',
            author: 'Autor de Prueba',
            rating: 4 
        };

        const response = await request(app).post('/api/reviews').send(newReview);
        console.log(response.body); 
        expect(response.statusCode).toBe(201);  
        expect(response.body).toHaveProperty('id');  
        expect(response.body.title).toBe(newReview.title);
    });

    // Test para actualizar una review existente
    it('Debe actualizar una review existente', async () => {
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
        expect(response.body).toBe(1);  
    });


afterAll(async () => {
    await server.close();
    await connectionDb.close();
  });
});


