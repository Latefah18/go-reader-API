import fastifyAutoload from '@fastify/autoload';/// IMPORT  AUTOLOAD 
import fastifySwagger from '@fastify/swagger';// IMPORT SWAGGER 
import { ajvTypeBoxPlugin, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { join } from 'path';
import fastifyJwt from '@fastify/jwt';

/// EXPORT THE SRVER
export const server = fastify({
	logger: true,
	ajv: {
		customOptions: {
			removeAdditional: 'all',
			ownProperties: true,
		},
		plugins: [ajvTypeBoxPlugin],
	},
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifyJwt,{secret: 'T5T'})///pass in .env 



server.register(fastifySwagger, {
	routePrefix: '/docs',
	exposeRoute: true,
	mode: 'dynamic',
	openapi: {
		info: {
			title: 'GoRader-API',
			version: '0.0.1',
		},
		security: [
			{
				bearerAuth: [],
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
});



//***************** */ to Run All router togather********************************* 
server.register(fastifyAutoload, {
	dir: join(__dirname, 'routes'),
});



