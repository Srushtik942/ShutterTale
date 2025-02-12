const request = require('supertest');
const {app}= require('../index');
const http = require('http');
const {execPath} = require('process');
const { searchImages } = require('../controllers/imageController');
const { resolve } = require('path');


// jest.mock('../controllers/imageController',()=>({
//     ...jest.requireActual('../controllers/imageController'),
//     searchImages:jest.fn(),
// }),5000)


let server;

beforeAll((done)=>{
    server = http.createServer(app);
    server.listen(3001,done);
});

afterAll((done)=>{
   server.close(done);
},10000);

// Testing endpoints and functions too

describe('API Endpoints',()=>{
    //testing user has created
    it('should return  201',async()=>{
        const response = await request(server).post('/api/users').send({
            username: 'Rugved',
            email: 'rugved@gmail.com',
        });
        console.log(response.body);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
                'message': 'User created successfully!',
                'user': {
                    'id': 41,
                    'username': 'Rugved',
                    'email': 'rugved@gmail.com',
                }

        })
    });
    it('should return 400 if user already exists',async()=>{
        const response = await request(server).post('/api/users').send({
            username: 'Ramesh',
            email: 'ramesh@gmail.com',
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual('User already exists!')
    });
    it('should return 200 if the photo saved successfully!',async()=>{
        const response = await request(server).post('/api/photos').send({

                'imageUrl': 'https://images.unsplash.com/photo...',
                'description': 'Beautiful landscape',
                'altDescription': 'Mountain view',
                'tags': ['nature', 'mountain'],
                'userId': 5

        });

        console.log(response.body);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
         'Photo saved successfully!'
        )
        expect(response.body.photo).toMatchObject({
            'imageUrl': 'https://images.unsplash.com/photo...',
            'description': 'Beautiful landscape',
            'altDescription': 'Mountain view',
            'tags': ['nature', 'mountain'],
            'userId': 5

        })
    });
    it('should be return 400 if tags are more than 5', async()=>{
        const response = await request(server).post('/api/photos').send({
            'imageUrl': 'https://images.unsplash.com/photo...',
            'description': 'Beautiful City',
            'altDescription': 'pink city',
            'tags': ['ranostav', 'udaipur','mehel','rajwada','shooting','ghoomar'],
            'userId': 5
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(
            'Tags should not be more than 5'
        )
    });
    it('should return 400 if query has not written',async()=>{
        const mockImage = [

		  {
		    'imageUrl': 'https://images.unsplash.com/photo...',
		    'description': 'A beautiful landscape',
		    'altDescription': 'Mountain view'
		  }

		]
        const response = await request(server).get('/api/search/photos');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual('Query is required!');
    });


})
