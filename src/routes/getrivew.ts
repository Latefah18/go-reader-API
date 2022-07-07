import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Rivew } from '@prisma/client'
import { ObjectId } from 'bson';
import { addAuthorization } from '../hook/hook';
const Rivew = Type.Object({
	bookBook_id: Type.String(),
   //rivews_id: Type.String()
});

const GetQuery = Type.Object({
	comment: Type.Optional(Type.String()),
});
type GetQuery = Static<typeof GetQuery>;

export default async function (server: FastifyInstance) {
	//addAuthorization(server);
/////use get query  *******************************************
server.route({
	method: 'GET',
	url: '/Rivew/:bookBook_id',
	schema: {
		summary: 'get rivew by id',
		tags: ['Rivew'],	
		params: Rivew

        
	},
	handler: async (request, reply) => {

		const { bookBook_id } = request.params as Rivew ;
		return await prismaClient.rivew.findMany({
			where:{bookBook_id}
		  });
  
		
			
		
	},

});	
}