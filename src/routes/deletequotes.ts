
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Quotes } from '@prisma/client'
import { addAuthorization } from '../hook/hook';

const Quotes = Type.Object({
    quotes_id:Type.String(),
    //comment: Type.String(),

});

export default async function (server: FastifyInstance) {
   // addAuthorization(server);
    server.route({
        method: 'DELETE',
        url: '/quotes/:id',
        schema: {
            summary: 'Delete quotes by id',
            tags: ['quotes'],	
            params: Type.Object({
                id: Type.String(),
    
            }),
        },
        handler: async (request, reply) => {
            const {  id } :any= request.params  ;
            await prismaClient.quotes.delete({
              where: { quotes_id:id },
            });
    
            return prismaClient.quotes.findMany();
        },
    
    });	
    }