import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Update} from '../controller/updatecontroller';

const  rate = Type.Object({
	rate: Type.String(),
	bookname: Type.String(),
	id: Type.String(),
});
type rate = Static<typeof  rate>;

const GetrateQuery = Type.Object({
	bookname: Type.Optional(Type.String()),
});
type GetrateQuery = Static<typeof GetrateQuery>;

export let rating: rate[] = [
	{id:"1", rate: '8', bookname: 'us '},
	{id:"2", rate: '10', bookname: 'we' },
	
]


export default async function (server: FastifyInstance) {
	//*********************add new book**************************8 
	server.route({
		method: 'POST',       
		url: '/rate',
		schema: {
			summary: 'rate ',
			tags: ['ADD'],
			body: rate,
		},
		handler: async (request, reply) => {
			const newbook: any = request.body;
           rating.push(newbook)
               return rating;
			
		},
	});

	server.route({
		method: 'DELETE',
		url: '/rate/:id',
		schema: {
			summary: 'remove  rate  by id ',
			tags: ['DELETE'],
			params: Type.Object({
				id: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;
			rating = rating.filter((c) => c.id !== id);

			return rating;
		},
	});

//***************** find user  or all users  by query **********************
    server.route({
		method: 'GET',
		url: '/rate',
		schema: {
			summary: 'show users or one ',
			tags: ['get query'],
			querystring: GetrateQuery,
			
		},
		handler: async (request, reply) => {
			const query = request.query as GetrateQuery ;

			if (query.bookname) {
				return rating.filter((c) => c.bookname.includes(query.bookname ?? ''));
			} else {
				return rating;
			}
		},
	});


//********************** update -_- ********************
server.route({
	method: 'PATCH',
	url: '/rating',
	schema: {
		summary: 'Update a book  by id',
		tags: ['update'],
		body: Type.Partial(rate),/// every thing optional
			
	},
	handler: async (request, reply) => {
		const newvalue: any = request.body;/// القيمة الجدديدة 
		return Update(rating, newvalue);
	

	
	}
});


}