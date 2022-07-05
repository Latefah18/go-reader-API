import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import {  Wantread } from '@prisma/client'
import { addAuthorization } from '../hook/hook';

const Book = Type.Object({
	book_id: Type.String(),
	title: Type.String(),
	type: Type.String(),
	author: Type.String(),
	pages: Type.String(),
	cost: Type.String(),
   description : Type.String(),
	
});

  const User = Type.Object({
    user_id : Type.String(),
    password: Type.String(),
    email   : Type.String(),
    username : Type.String(),

})


export default async function (server: FastifyInstance) {
   // addAuthorization(server);

    server.route({
        
        method: 'GET',
        url: '/want',
        schema: {
            summary: 'get all wantread',
            tags: ['wantread'],	
    
        },
        handler: async (request, reply) => {
            
    
         return await prismaClient.wantread.findMany();
          
        },
    
    });	
}
