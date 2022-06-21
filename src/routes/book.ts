
import { FastifyInstance } from 'fastify';
import { findbookcontroller } from '../controller/find';

export let books:any [] = [
    {
        id: 1,
        title: 'This is an experiment'
    },
    {
        id: 2,
        title: 'Fastify is pretty cool'
    },
    {
    id: 3,
    title: 'I love typescript'
    }
]

//************************get all books************************************ 
export default async function (server: FastifyInstance) {
server.route({
    method: 'GET',
    url: '/show',
    schema: {
        summary: 'show all books ',
        tags: ['show'],
    },
    handler: async (request, reply) => {
            return books;
    },
});

/// **************************add books************************************
server.route({
    method: 'POST',
    url: '/add',
    schema: {
        summary: 'add new books  ',
        tags: ['add'],
   
    },
    handler: async (request, reply) => {
      const bokss=  request.body
            books.push(bokss)
             return books;

            
    },

	
});

server.route({
    method: 'GET',
    url: '/find/:id',
    schema: {
        summary: 'find books by id  ',
        tags: ['find'],
   
    },
    handler: async (request, reply) => {
		const  id  = request.params ;
 return findbookcontroller(books,id);

            
    },

	
});






};



