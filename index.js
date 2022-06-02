const { ApolloServer } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');
const dotenv = require('dotenv');

dotenv.config();

// Initialize an ApolloGateway instance and pass it
// the supergraph schema as a string
const gateway = new ApolloGateway({
	supergraphSdl: new IntrospectAndCompose({
		subgraphs: [
			{ name: 'accounts', url: process.env.SUBGRAPH_ACCOUNTS},
			{ name: 'products', url: process.env.SUBGRAPH_PRODUCTS},
		]
	}),
	uplinkMaxRetries: 3,
	fallbackPollIntervalInMs: 300000, // 5 minutes
});

const server = new ApolloServer({
  gateway,
  // Subscriptions are not currently supported in Apollo Federation
  subscriptions: false
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});
