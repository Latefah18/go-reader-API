import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
//import { Update} from '../controller/updatecontroller';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Rivew  } from '@prisma/client'
//import { addAuthorization } from '../hook/hook';

const Rivew = Type.Object({
	comment: Type.String(),
	rating: Type.Number(),
	//userUser_id:Type.String(),
    //bookBook_id:Type.String()
	
});

const Ri = Type.Object({
	userUser_id:Type.String(),
    bookBook_id:Type.String()
	
});

type Ri = Static<typeof Ri>;

export default async function (server: FastifyInstance) {
	//*********************add rivew **************************
	//addAuthorization(server);
	server.route({
		method: 'POST',
		url: '/Rivew/:userUser_id/:bookBook_id',
		schema: {
			summary: 'add new Rivew',
			tags: ['Rivew'],
			body:Rivew,
		    params:Ri,	
		},
		handler: async (request, reply) => {
	       const ri=request.params as Ri
			const rivews= request.body as Rivew;
			await prismaClient.rivew.create({
				data:{
					comment:rivews.comment,
					rating:rivews.rating,
					userUser_id:ri.userUser_id,
					bookBook_id:ri.bookBook_id


				

				}
				
				

			});

			return prismaClient.rivew.findMany();
		},
	});
}







