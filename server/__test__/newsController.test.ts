import request from 'supertest';
import { app, server } from '../app'; // Asegúrate de que esta es la ruta correcta a tu app y servidor
import connectionDb from '../database/conectionDb';
import UserModel from '../models/userModel';
import NewsModel from '../models/newsModel';
import { status } from '../interfaces/userInterface';

let token: string;

beforeAll(async () => {
    await connectionDb.sync({ force: true });

    // Crear un usuario de prueba y obtener un token
    await UserModel.create({
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
        birth_date: new Date('1992-02-02'),
        password: 'Password123',
        bio: 'Test bio',
        avatar: 'avatar.png',
        rol: 'admin',
        created_at: new Date(),
        status: status.active,
    });

    // Autenticar y obtener el token
    const loginResponse = await request(app)
        .post('/api/login') 
        .send({ email: 'jane@example.com', password: 'Password123' });
    token = loginResponse.body.token;
});

// Método POST para crear una nueva entrada de noticias con imágenes
it('METHOD POST - should create a new news entry with images', async () => {
    const report = {
        user_id: 1,
        rol: "admin",
        title: "Test News",
        news: "This is the news content",
        num_likes: 1,
        image_url: "image.png",
        image2_url: "image2.png",
    };

    const response = await request(app)
        .post('/api/news')
        .set('Authorization', `Bearer ${token}`)
        .send(report);

    console.log("Response body en POST:", response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');  
    expect(response.body.title).toEqual(report.title);
});

// Método DELETE para eliminar una entrada de noticias
it('METHOD DELETE - should delete a news entry', async () => {
    const newToDelete = await NewsModel.create({
        user_id: 1,
        rol: "admin",
        title: "test",
        news: "test content",
        num_likes: 100,
        image_url: "image.png",
        image2_url: "image2.png"
    });

    const id = newToDelete?.get('id')?.toString();

    const response = await request(app)
        .delete(`/api/news/${id}`)
        .set('Authorization', `Bearer ${token}`) 

    console.log("Response body en DELETE:", response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(1);  
});

// Método PUT para actualizar una entrada de noticias
it('METHOD PUT - should update the news entry', async () => {
    const newNews = await NewsModel.create({
        user_id: 1,
        rol: "admin",
        title: "Initial Title",
        news: "Initial news content",
        num_likes: 50,
        image_url: "image.png",
        image2_url: "image2.png"
    });

    const updatedData = {
        user_id: 1,
        rol: "admin",
        title: "update Title",
        news: "update news content",
        num_likes: 150,
        image_url: "imageupdate.png",
        image2_url: "image2update.png"
    };

    const id = newNews?.get('id')?.toString();
    const response = await request(app)
        .put(`/api/news/${id}`)
        .set('Authorization', `Bearer ${token}`) 
        .send(updatedData);

    console.log("Response body en PUT:", response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedData.title);
});

afterAll(async () => {
    server.close();
});
