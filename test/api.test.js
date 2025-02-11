const request = require('supertest');
const {app}= require('../index');
const http = require('http');
const {execPath} = require('process');

let server;

beforeAll((done)=>{
    server = http.createServer(app);
    server.listen(3001,done);
},5000);

afterAll((done)=>{
    server.close(done);
});

// Testing endpoints and functions too

describe('API Endpoints',()=>{
    //testing user has created
    it('should return  201',async()=>{
        const response = await request(server).post('/api/users').send({
            username: 'Anjali Kulkarni',
            email: 'AK@gmail.com',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
                'message': 'User created successfully!',
                'user': {
                    'id': 6,
                    'username': 'Anjali Kulkarni',
                    'email': 'AK@gmail.com',
                }

        })
    })
})