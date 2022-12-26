import { fastify } from "fastify";
import { __prod__ } from "./utils/constants.js";
import mercurius from "mercurius";
import { buildContext } from "./modules/graphql/context.js";
import { schema } from "./modules/graphql/schema.js";

const app = fastify({
    logger: !__prod__ && { transport: { target: "@fastify/one-line-logger" } }
});

async function main() {
    try {
        app.get("/healthcheck", {}, (_req, reply) => {
            reply.send({
                data: "OK"
            });
        });

        // GraphQL server setup
        app.register(mercurius, {
            schema,
            context: buildContext,
            graphiql: !__prod__
        });

        app.listen({ port: 4000 }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(0);
            }
            console.log(`🚀 Server listening at ${address}`);
            !__prod__ &&
                console.log(`GraphiQL available at ${address}/graphiql`);
        });
    } catch (e) {
        console.error(e);
    }
}

main();
