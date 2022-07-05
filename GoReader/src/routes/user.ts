import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Update} from '../controller/updatecontroller';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { User} from '@prisma/client'
import { addAuthorization } from '../hook/hook';
const  User= Type.Object({
	id: Type.String(),
	name: Type.String(),
	
});

const GetuserQuery = Type.Object({
	id: Type.Optional(Type.String()),
});
type GetuserQuery = Static<typeof GetuserQuery>;



export default async function (server: FastifyInstance) {
//	addAuthorization(server);

	server.route({
		
		method: 'GET',
		url: '/users',
		schema: {
			summary: 'get all users',
			tags: ['user'],	
			
		},
		handler: async (request, reply) => {
		
 return await prismaClient.user.findMany();
			
		},
	
	});	


}