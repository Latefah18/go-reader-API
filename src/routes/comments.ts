import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Update} from '../controller/updatecontroller';

const  comment = Type.Object({
    id: Type.String(),
	name: Type.String(),
	comment: Type.String(),
	
});
type comment = Static<typeof  comment>;

const GetcommentQuery = Type.Object({
	id: Type.Optional(Type.String()),
});
type GetcommentQuery = Static<typeof GetcommentQuery>;

export let comments: comment[] = [
	{  id:"1",  name: 'ahmad ',comment:'wow'},
	{ id:"2", name: 'amal',comment:'rrrr' },
	
]


export default async function (server: FastifyInstance) {
	//*********************add new book**************************8 
	server.route({
		method: 'POST',       
		url: '/comment',
		schema: {
			summary: 'new comment ',
			tags: ['ADD'],
			body: comment,
		},
		handler: async (request, reply) => {
			const newcomm: any = request.body;
           comments.push(newcomm)
               return comments;
			
		},
	});

	server.route({
		method: 'DELETE',
		url: '/comment/:id',
		schema: {
			summary: 'Delete comment by id ',
			tags: ['DELETE'],
			params: Type.Object({
				id: Type.String(),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;
			comments = comments.filter((c) => c.id !== id);

			return comments;
		},
	});

//***************** find comments  or all comments  by query **********************
    server.route({
		method: 'GET',
		url: '/comment',
		schema: {
			summary: 'show comment  ',
			tags: ['get query'],
			querystring: GetcommentQuery,
			
		},
		handler: async (request, reply) => {
			const query = request.query as GetcommentQuery ;

			if (query.id) {
				return comments.filter((c) => c.id.includes(query.id ?? ''));
			} else {
				return comments;
			}
		},
	});



//********************** update -_- ********************
server.route({
	method: 'PATCH',
	url: '/comment',
	schema: {
		summary: 'Update comment',
		tags: ['update'],
		body: Type.Partial(comment),/// every thing optional
			
	},
	handler: async (request, reply) => {
		const newvalue: any = request.body;/// القيمة الجدديدة 
		return Update(comments, newvalue);
	

	
	}
});


}

