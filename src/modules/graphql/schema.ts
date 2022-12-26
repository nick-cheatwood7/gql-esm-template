import { fieldAuthorizePlugin, makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types/index.js";

export const schema = makeSchema({
    types,
    contextType: {
        module: join(process.cwd(), "./src/modules/graphql/context.ts"),
        export: "IContext"
    },
    outputs: {
        schema: join(
            process.cwd(),
            "./src/modules/graphql/generated/schema.graphql"
        ),
        typegen: join(
            process.cwd(),
            "./src/modules/graphql/generated/nexus-typegen.cts"
        )
    },
    features: {
        abstractTypeStrategies: {
            resolveType: true, //default
            isTypeOf: false, //default
            __typename: true
        }
    },
    plugins: [fieldAuthorizePlugin()]
});
