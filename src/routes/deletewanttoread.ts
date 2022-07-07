
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
    //addAuthorization(server);

    server.route({
        method: 'DELETE',
        url: '/want:id',
        schema: {
            summary: 'Delete wantread by id',
            tags: ['wantread'],	
            params: Type.Object({
                id: Type.String(),
    
            }),
    
        },
        handler: async (request, reply) => {
            const { id } :any= request.params  ;
            await prismaClient.wantread.delete({
              where: {   Wantread_id: id },
            });
    
            return prismaClient.wantread.findMany();
        },
    
    });	

}