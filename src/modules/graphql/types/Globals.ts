import { interfaceType } from "nexus";

export const Node = interfaceType({
    name: "Node",
    definition(t) {
        t.nonNull.id("id", { description: "The GUID of the resource" });
    }
});
