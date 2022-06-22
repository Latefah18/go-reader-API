import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Update} from '../controller/updatecontroller';

const  collection = Type.Object({
	id: Type.String(),
	name: Type.String(),
	
});
type  collection = Static<typeof  collection>;

const GetcollectionQuery = Type.Object({
	id: Type.Optional(Type.String()),
});
type GetcollectionQuery = Static<typeof GetcollectionQuery>;

export let collections: collection[] = [
	{ id: '1', name: 'books i like '},
	{ id: '2', name: 'books i want to read' },
	
]


export default async function (server: FastifyInstance) {
	//*********************add new book**************************8 
	server.route({
		method: 'POST',       
		url: '/collection',
		schema: {
			summary: 'add collection ',
			tags: ['ADD'],
			body: collection,
		},
		handler: async (request, reply) => {
			const newbook: any = request.body;
            collections.push(newbook)
               return collections;
			
		},
	});

	server.route({
		method: 'DELETE',
		url: '/collection/:id',
		schema: {
			summary: 'Deletecollection by id ',
			tags: ['DELETE'],
			params: Type.Object({
				id: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;
			collections = collections.filter((c) => c.id !== id);

			return collections;
		},
	});

//***************** find collection  or all collection  by query **********************
    server.route({
		method: 'GET',
		url: '/collections',
		schema: {
			summary: 'show collection or one ',
			tags: ['get query'],
			querystring: GetcollectionQuery,
			
		},
		handler: async (request, reply) => {
			const query = request.query as GetcollectionQuery ;

			if (query.id) {
				return collections.filter((c) => c.id.includes(query.id ?? ''));
			} else {
				return collections;
			}
		},
	});

//********************** update -_- ********************
server.route({
	method: 'PATCH',
	url: '/collection',
	schema: {
		summary: 'Update collection',
		tags: ['update'],
		body: Type.Partial(collection),/// every thing optional
			
	},
	handler: async (request, reply) => {
		const newvalue: any = request.body;/// القيمة الجدديدة 
		return Update(collections, newvalue);
	

	
	}
});










}