import fastifyAutoload from '@fastify/autoload';/// IMPORT  AUTOLOAD 
import fastifySwagger from '@fastify/swagger';// IMPORT SWAGGER 
import fastify from 'fastify';
import { join } from 'path';// PACKAGE FROM NODE JS 
//*************************************************************** */
export const server = fastify({ logger: true });/// EXPORT THE SRVER
//********************************************************************* */
server.register(fastifySwagger, {
	routePrefix: '/docs',
	exposeRoute: true,
	mode: 'dynamic',
	openapi: {
		info: {
			title: 'GOReader',
			version: '0.0.1',
		},
	},
});



//***************** */ to Run All router togather********************************* 
server.register(fastifyAutoload, {
	dir: join(__dirname, 'routes'),
});

