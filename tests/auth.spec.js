const request = require('supertest');
const mongoose = require("mongoose");
const app = require('../app');

let server;

beforeAll((done) => {
    server = app.listen(4000, () => {
        global.agent = request.agent(server); 
        done();
    });
});

afterAll(async () => {
    await mongoose.connection.close(); 
    await server.close(); 
});

describe('User Registration and Login', () => {
    it('Should register user successfully with default organisation', async () => {
        const res = await request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'onyiii@gmail.com',
                password: 'password123',
                phone: '1234567890'
            });
        console.log(res.body); // Log response body for debugging
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual('success');
        expect(res.body.data.user.firstName).toEqual('John');
    });

    it('Should log the user in successfully', async () => {
        const res = await request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'onyiii@gmail.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.data.user.email).toEqual('onyiii@gmail.com');
    });

    it('Should fail if required fields are missing', async () => {
        const res = await request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
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
            .set('Content-Type', 'application/json')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'onyiii@gmail.com',
                password: 'password123',
                phone: '1234567890'
            });
        expect(res.statusCode).toEqual(400);
    });
});
