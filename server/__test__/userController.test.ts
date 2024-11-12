import request from 'supertest';
import bcrypt from 'bcrypt';
import { app, server } from '../app';
import connectionDb from '../database/conectionDb';
import UserModel from '../models/userModel';
import { status } from '../interfaces/userInterface';

describe('CRUD usuarios', () => {
  let token: string;

  beforeAll(async () => {
    // Crear un usuario con rol de admin para iniciar sesión y obtener un token
    await UserModel.create({
      name: 'John Admin',
      email: 'admin@example.com',
      birth_date: new Date('1990-01-01'),
      password: bcrypt.hashSync('Password123', 10),  // Contraseña con mayúscula al inicio
      bio: 'Admin user',
      avatar: 'avatar.png',
      rol: 'admin',   // Rol de admin
      created_at: new Date(),
      status: status.active,
    });

    const loginResponse = await request(app).post('/api/login').send({
      email: 'admin@example.com',
      password: 'Password123',  // Contraseña actualizada con mayúscula al inicio
    });
    token = loginResponse.body.token;
  });

  test('Debería crear un usuario correctamente', async () => {
    const userData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      birth_date: new Date('1992-02-02'),
      password: 'Password123',  // Contraseña con mayúscula al inicio
      bio: 'Test bio',
      avatar: 'avatar.png',
      rol: 'user',
      created_at: new Date(),
      status: status.active,
    };
    const response = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body.user.name).toBe(userData.name);
    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.user.birth_date.split('T')[0]).toBe(userData.birth_date.toISOString().split('T')[0]);
    expect(response.body.user.bio).toBe(userData.bio);
    expect(response.body.user.avatar).toBe(userData.avatar);
  });

  test('Debería obtener todos los usuarios', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    console.log(response.body); // Ver respuesta detallada para depuración
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test('Debería iniciar sesión con un usuario existente', async () => {
    const loginResponse = await request(app).post('/api/login').send({
      email: 'admin@example.com',
      password: 'Password123',  
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
    expect(loginResponse.body).toHaveProperty('token');
  });

  test('Debería actualizar un usuario existente', async () => {
    const response = await request(app)
      .put('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Updated',
        email: 'johnupdated@example.com',
        birth_date: new Date('1992-02-02'),
        password: 'NewPassword123',  // Contraseña con mayúscula al inicio
        bio: 'Updated bio',
        avatar: 'newavatar.png',
        rol: 'admin',
        status: status.active,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuario actualizado');
  });

  test('Debería eliminar un usuario existente', async () => {
    const response = await request(app)
      .delete('/api/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuario eliminado');
  });

  afterEach(async () => {
    await UserModel.destroy({
      where: { email: ['admin@example.com', 'jane@example.com', 'johnupdated@example.com'] },
    });
  });

  afterAll(async () => {
    server.close();
    await connectionDb.close();
  });
});
