import { objectType, inputObjectType } from "nexus";
import type {
    InputDefinitionBlock,
    OutputDefinitionBlock
} from "nexus/dist/definitions/definitionBlocks.js";
import { Node } from "./Globals.js";

const userDefinition = <N extends string>(
    t: InputDefinitionBlock<N> | OutputDefinitionBlock<N>
) => {
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
    t.nonNull.string("email");
    t.nonNull.string("password");
};

export const UserInput = inputObjectType({
    name: "UserInput",
    definition: userDefinition
});

export const User = objectType({
    name: "User",
    definition(t) {
        t.implements(Node);
        userDefinition(t);
    }
});
