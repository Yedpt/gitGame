import request from 'supertest';
import bcrypt from 'bcrypt';
import { app, server } from '../app';
import connectionDb from '../database/conectionDb';
import UserModel from '../models/userModel';
import { status } from '../interfaces/userInterface';

describe('CRUD usuarios', () => {
  // Sincronizar la base de datos antes de todas las pruebas
  beforeAll(async () => {
    await connectionDb.sync({ force: true });
  });

  // Cerrar conexión y servidor después de todas las pruebas
  afterAll(async () => {
    await server.close();
    await connectionDb.close();
  });

  test('Debería crear un usuario correctamente', async () => {
    const response = await request(app).post('/api/users').send({
      name: 'John Doe',
      email: 'john@example.com',
      birth_date: '1990-01-01',
      password: 'password123',
      bio: 'Test bio',
      avatar: 'avatar.png',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuario creado exitosamente');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe('john@example.com');
  });

  test('Debería obtener todos los usuarios', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Debería obtener un usuario por ID', async () => {
    const newUser = await UserModel.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      birth_date: new Date('1992-02-02'),
      password: await bcrypt.hash('password123', 10),
      bio: 'Another test bio',
      avatar: 'avatar2.png',
      created_at: new Date(),
      status: status.active,
      rol: 'usuario',
    });

    const response = await request(app).get(`/api/users/${newUser.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe('jane@example.com');
  });

  test('Debería iniciar sesión con un usuario existente', async () => {
    const loginResponse = await request(app).post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
    expect(loginResponse.body).toHaveProperty('token');
  });

  test('Debería actualizar un usuario existente', async () => {
    const response = await request(app).put('/api/users/1').send({
      name: 'John Updated',
      email: 'johnupdated@example.com',
      birth_date: new Date('1992-02-02'),
      password: 'newpassword123',
      bio: 'Updated bio',
      avatar: 'newavatar.png',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuario actualizado');
  });

  test('Debería eliminar un usuario existente', async () => {
    const response = await request(app).delete('/api/users/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Usuario eliminado');
  });
  
  // Limpiar la base de datos después de cada prueba
  afterEach(async () => {
    await UserModel.destroy({
      where: { email: ['john@example.com', 'jane@example.com'] },
    });
  });
});
