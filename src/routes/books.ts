import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Update} from '../controller/updatecontroller';

const book = Type.Object({
	id: Type.String(),
	name: Type.String(),
	
});
type book = Static<typeof book>;

const GetContactsQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetContactsQuery = Static<typeof GetContactsQuery>;

export let books: book[] = [
	{ id: '1', name: 'the fault in our stars'},
	{ id: '2', name: 'red sun ' },
	{ id: '3', name: 'everything everything'},
	{ id: '4', name: 'about'},
	
	
]
export default async function (server: FastifyInstance) {
	//*********************add new book**************************8 
	server.route({
		method: 'POST',       
		url: '/books',
		schema: {
			summary: 'add new books ',
			tags: ['ADD'],
			body: book,
		},
		handler: async (request, reply) => {
			const newbook: any = request.body;
              books.push(newbook)
               return books;
			
		},
	});
//********************** update -_- ********************
	server.route({
		method: 'PATCH',
		url: '/book',
		schema: {
			summary: 'Update a book  by id',
			tags: ['update'],
			body: Type.Partial(book),/// every thing optional
				
		},
		handler: async (request, reply) => {
			const newvalue: any = request.body;/// القيمة الجدديدة 
			return Update(books, newvalue);
		

		
		}
	});


//***************delete book by id ********************
	server.route({
		method: 'DELETE',
		url: '/book/:id',
		schema: {
			summary: 'Delete a book by id',
			tags: ['DELETE'],
			params: Type.Object({
				id: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;
			books = books.filter((c) => c.id !== id);

			return books;
		},
	});
//*****************find book by id***********************************
	server.route({
		method: 'GET',
		url: '/book/:id',
		schema: {
			summary: 'find book by id ',
			tags: ['GET'],
			params: Type.Object({
				id: Type.String(),
			}),
			
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			return books.find((c) => c.id === id) ?? null;
		},
	});
//***************** find book or all boks by query **********************
	server.route({
		method: 'GET',
		url: '/books',
		schema: {
			summary: 'show all books',
			tags: ['get query'],
			querystring: GetContactsQuery,
			
		},
		handler: async (request, reply) => {
			const query = request.query as GetContactsQuery;

			if (query.name) {
				return books.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return books;
			}
		},
	});
}
