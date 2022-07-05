import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import {  Wantread } from '@prisma/client'
import { addAuthorization } from '../hook/hook';



export const Book = Type.Object({
	book_id: Type.String(),
	title: Type.String(),
	type: Type.String(),
	author: Type.String(),
	pages: Type.String(),
	cost: Type.String(),
   description : Type.String(),
	
});

export const User = Type.Object({
    user_id : Type.String(),
    password: Type.String(),
    email   : Type.String(),
    username : Type.String(),

})

const wantread = Type.Object({
    userUser_id : Type.String(),
    
});

export default async function (server: FastifyInstance) {
	
   // addAuthorization(server);

    server.route({
		method:'POST',
		url: '/want',
		schema: {
			summary: 'add read want',
			tags: ['wantread'],
			body: wantread,
		},
		
		handler: async (request, reply) => {
			const want= request.body as Wantread
			await prismaClient.wantread.create({
				data: want,
			});

			return prismaClient.wantread.findMany();
		},
	});

}