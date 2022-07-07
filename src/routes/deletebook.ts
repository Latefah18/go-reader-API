import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Book } from '@prisma/client'
import { addAuthorization } from '../hook/hook';

export default async function (server: FastifyInstance) {
    //addAuthorization(server);
server.route({
    method: 'DELETE',
    url: '/book/:id',
    schema: {
        summary: 'Delete book by id',
        tags: ['Book'],	
        params: Type.Object({
            id: Type.String(),

        }),

    },
    handler: async (request, reply) => {
        const { id } :any= request.params  ;
        await prismaClient.book.delete({
          where: { book_id: id },
        });

        return prismaClient.book.findMany();
    },

});	
}