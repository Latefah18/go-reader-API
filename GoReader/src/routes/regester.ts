
import fastify, { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import {User} from '@prisma/client'
import bcrypt from "bcrypt";

const saltRounds = 10;
const User = Type.Object({
	password: Type.String(),
	email : Type.String(),
	username: Type.String(),

})


export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/users',
		schema: {
			summary: 'add new user',
			tags: ['user'],
			body:User,
		},
		handler: async (request, reply) => {
			const {password }:any = request.body;
			const hash = bcrypt.hashSync(password, saltRounds);
		
			const {email }:any = request.body;
			const {username }:any = request.body;
			const tok=await prismaClient.user.create({
				data:{
					password:(hash),
					email,
					username,
				  },
				});

				  const token = server.jwt.sign({///// send token with user Id 
					id:tok.user_id ,
	
				});

				return {
					id:tok.user_id,
					token,
					type: 'SignUp',
				};

			}

		}
	)


}

			
	
	
