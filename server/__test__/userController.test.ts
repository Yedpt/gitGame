import request from 'supertest';
import bcrypt from 'bcrypt';
import { app, server } from '../app';
import connectionDb from '../database/conectionDb';
import UserModel from '../models/userModel';
import { status } from '../interfaces/userInterface';
import { JWT_SECRET } from '../config';

describe('CRUD usuarios', () => {
  let token: string;

  beforeAll(async () => {
    // Sincroniza la base de datos antes de las pruebas
    await connectionDb.sync({ force: true });
    
    // Crea un usuario administrador para autenticación en las pruebas
    await UserModel.create({
      name: 'John Admin',
      email: 'admin@example.com',
      birth_date: new Date('1990-01-01'),
      password: bcrypt.hashSync('Password123', 10),
      bio: 'Admin user',
      avatar: 'avatar.png',
      rol: 'admin',
      created_at: new Date(),
      status: status.active,
    });

    // Inicia sesión y guarda el token para futuras solicitudes
    const loginResponse = await request(app).post('/api/login').send({
      email: 'admin@example.com',
      password: 'Password123',
    });
    console.log('Login Response:', loginResponse.body); // Log para depuración
    token = loginResponse.body.token;
  });

  test('Debería crear un usuario correctamente', async () => {
    const userData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      birth_date: new Date('1992-02-02'),
      password: 'Password123',
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
    expect(response.body.user.bio).toBe(userData.bio);
    expect(response.body.user.avatar).toBe(userData.avatar);
  });

  test('Debería obtener todos los usuarios', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    console.log('Get All Users Response:', response.body); // Log para depuración
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test('Debería crear e iniciar sesión con un usuario existente', async () => {
    // Paso 1: Crear un usuario
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'Password123',  // Contraseña con mayúscula al inicio
      birth_date: new Date('1993-03-03'),
      bio: 'Test user bio',
      avatar: 'avatar.png',
      rol: 'user',
      status: status.active,
    };
  
    const createUserResponse = await request(app)
      .post('/api/users')
      .send(newUser); // Aquí no es necesario el token, suponiendo que el registro de usuario es público
  
    expect(createUserResponse.statusCode).toBe(201);
    expect(createUserResponse.body.user.email).toBe(newUser.email);
  
    // Paso 2: Iniciar sesión con el usuario recién creado
    const loginResponse = await request(app).post('/api/login').send({
      email: newUser.email,
      password: newUser.password,
    });
  
    // Validaciones de la respuesta de login
    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.message).toBe('Inicio de sesión exitoso');
    expect(loginResponse.body).toHaveProperty('token');
  
    // Opcional: guardar el token para futuros tests si es necesario
    const token = loginResponse.body.token;
    console.log('Token generado en login:', token); // Útil para depuración
  });

  test('Debería actualizar un usuario existente', async () => {
    const response = await request(app)
      .put('/api/users/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Updated',
        email: 'johnupdated@example.com',
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
