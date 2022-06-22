import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Update} from '../controller/updatecontroller';

const  user = Type.Object({
	id: Type.String(),
	name: Type.String(),
	
});
type user = Static<typeof  user>;

const GetuserQuery = Type.Object({
	id: Type.Optional(Type.String()),
});
type GetuserQuery = Static<typeof GetuserQuery>;

export let users: user[] = [
	{ id: '1', name: 'ahmad '},
	{ id: '2', name: 'amal' },
	
]


export default async function (server: FastifyInstance) {
	//*********************add new book**************************8 
	server.route({
		method: 'POST',       
		url: '/user',
		schema: {
			summary: 'new user ',
			tags: ['ADD'],
			body: user,
		},
		handler: async (request, reply) => {
			const newbook: any = request.body;
           users.push(newbook)
               return users;
			
		},
	});

	server.route({
		method: 'DELETE',
		url: '/user/:id',
		schema: {
			summary: 'Delete user by id ',
			tags: ['DELETE'],
			params: Type.Object({
				id: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;
			users = users.filter((c) => c.id !== id);

			return users;
		},
	});

//***************** find user  or all users  by query **********************
    server.route({
		method: 'GET',
		url: '/users',
		schema: {
			summary: 'show users or one ',
			tags: ['get query'],
			querystring: GetuserQuery,
			
		},
		handler: async (request, reply) => {
			const query = request.query as GetuserQuery ;

			if (query.id) {
				return users.filter((c) => c.id.includes(query.id ?? ''));
			} else {
				return users;
			}
		},
	});


//********************** update -_- ********************
server.route({
	method: 'PATCH',
	url: '/user',
	schema: {
		summary: 'Update a book  by id',
		tags: ['update'],
		body: Type.Partial(user),/// every thing optional
			
	},
	handler: async (request, reply) => {
		const newvalue: any = request.body;/// القيمة الجدديدة 
		return Update(users, newvalue);
	

	
	}
});




}