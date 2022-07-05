import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import {User} from '@prisma/client'
import { server } from '../server';
import fastifyJwt from '@fastify/jwt';
//import { ObjectId } from 'bson';//
import * as bcrypt from "bcrypt"


const User = Type.Object({
	password: Type.String(),
	username: Type.String(),
})


export default async function (server: FastifyInstance) {
	//addAuthorization(server);
server.route({
	method: 'POST',
	url: '/user/login',
	schema: {
		summary: 'login',
		tags: ['user'],
		body: User,
	},
	handler: async (request, reply) => {

		const { password } = request.body as User
		const { username } = request.body as User
		
		
	const user=  await prismaClient.user.findFirst({
				where:{username}})

			  if(!user){
				reply.code(404).send({message:"invalid username or password"});
				//return process.exit(0);
			  }

	       else if(user){

			const d= user.password
	
			const result = bcrypt.compareSync(password,d)

					if (!result){
						
						reply.code(404).send({message:"invalid username or password"});
						console.log("errrr")
					return;	
					}
					
				
		           else {
					const token = server.jwt.sign({
						id:user.user_id ,
						
				});

				return {
					id:user.user_id ,///// send token with user Id 
					token,
					type: 'SignIn',
				};}
				   
				 
				
				 
				 
				   /* {	const token =server.jwt.sign({email:User.email})
				   const decodedToken = server.jwt.decode(token)
					 reply.code(200).send({message:"user logged in" ,data:user,decodedToken});	 
					 console.log("user logged in ") }*/
	          	}}})} 
	
		


		











