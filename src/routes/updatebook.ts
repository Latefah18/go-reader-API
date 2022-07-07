import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Book } from '@prisma/client'
import { ObjectId } from 'bson';
import { addAuthorization } from '../hook/hook';


const Booknoid = Type.Object({
	title: Type.String(),
	type: Type.String(),
	author: Type.String(),
	pages: Type.String(),
	cost: Type.String(),
   description : Type.String(),
	
});


type Booknoid = Static<typeof Booknoid>;

const Partialbook = Type.Partial(Booknoid);
type Partialbook = Static<typeof Partialbook>;


const bookParams = Type.Object({
	book_id: Type.String() ,
});
type bookParams = Static<typeof bookParams>;


export default async function (server: FastifyInstance) {
	//*********************Update book usin patch ************************ 
//	addAuthorization(server);
	server.route({
		method: 'PATCH',
		url: '/Book/:book_id',
		schema: {
			summary: 'Update books  by id ',
			tags: ['Book'],
			body: Partialbook,
			params:bookParams ,
		},
		handler: async (request, reply) => {
			const { book_id}:any = request.params as object ;
			if (!ObjectId.isValid( book_id)) {
				reply.send('contact_id should be an ObjectId!');
				return;
			}

			const gg = request.body as Partialbook;

			return prismaClient.book.update({
				where: { book_id },
				data: gg,
			});
		},
	});

}