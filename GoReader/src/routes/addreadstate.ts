
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Readstate} from '@prisma/client'
import { addAuthorization } from '../hook/hook';

const Readstate = Type.Object({
    state : Type.String(),
});

export default async function (server: FastifyInstance) {
	addAuthorization(server);
	//*********************add state************************ 
	server.route({
		method: 'POST',
		url: '/states',
		schema: {
			summary: 'add read state',
			tags: ['readstate'],
			body: Readstate,
		},
		handler: async (request, reply) => {
			const state= request.body as Readstate;
			await prismaClient.readstate.create({
				data: state,
			});

			return prismaClient.readstate.findMany();
		},
	});
}