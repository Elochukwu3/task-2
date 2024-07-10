const request = require('supertest');
const mongoose = require("mongoose");
const app = require('../app');
// const { describe, it } = require("node:test");

afterAll(async () => {
    await mongoose.connection.close(); // Close mongoose connection
    await server.close(); // Close the server instance
  });
  

describe('User Registration and Login', () => {
    it('Should register user successfully with default organisation', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'jhn@example.com',
                password: 'password123',
                phone: '1234567890'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('success');
        expect(res.body.data.user.firstName).toEqual('John');
    });

    it('Should log the user in successfully', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'jhn@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data.user.email).toEqual('jhn@example.com');
    });

    it('Should fail if required fields are missing', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phone: '1234567890'
            });
        expect(res.statusCode).toEqual(422);
    });

    it('Should fail if there’s duplicate email or userId', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'jhn@example.com',
                password: 'password123',
                phone: '1234567890'
            });
        expect(res.statusCode).toEqual(400);
    });
});
