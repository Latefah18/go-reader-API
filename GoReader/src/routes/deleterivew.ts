import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Rivew } from '@prisma/client'
import { addAuthorization } from '../hook/hook';

export default async function (server: FastifyInstance) {
   // addAuthorization(server);
server.route({
    method: 'DELETE',
    url: '/rivew/:id',
    schema: {
        summary: 'Delete Rivew by id',
        tags: ['Rivew'],	
        params: Type.Object({
            id: Type.String(),

        }),

    },
    handler: async (request, reply) => {
        const { id } :any= request.params  ;
        await prismaClient.rivew.delete({
          where: {  rivews_id: id },
        });

        return prismaClient.rivew.findMany();
    },

});	
}