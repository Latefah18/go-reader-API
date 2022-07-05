import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient()
import { Book } from '@prisma/client'
import { ObjectId } from 'bson';
import { addAuthorization } from '../hook/hook';




const Usernoid = Type.Object({
	//password: Type.String(),
	email : Type.String(),
	username: Type.String(),

})



type Usernoid = Static<typeof Usernoid>;

const Partialuser = Type.Partial(Usernoid);
type Partialuser = Static<typeof Partialuser>;


const userParams = Type.Object({
	user_id: Type.String() ,
});
type userParams = Static<typeof userParams>;


export default async function (server: FastifyInstance) {
	//*********************Update book usin patch ************************ 
	//addAuthorization(server);
	server.route({
		method: 'PATCH',
		url: '/user/:user_id',
		schema: {
			summary: 'Update user info  by id ',
			tags: ['user'],
			body: Partialuser,
			params:userParams ,
		},
		handler: async (request, reply) => {
			const { user_id}:any = request.params as object ;
			if (!ObjectId.isValid(user_id)) {
				reply.send('contact_id should be an ObjectId!');
				return;
			}

			const use = request.body as Partialuser;

			return prismaClient.user.update({
				where: { user_id },
				data: use,
			});
		},
	});

}