import { dirname, relative, resolve } from "node:path";

const boundaries = {
  meta: {
    type: "problem",
    schema: [],
    messages: { boundary: "Import violates ARCHITECTURE.md: {{source}}" },
  },
  create(context) {
    const root = resolve("src");
    const current = relative(root, context.filename).replaceAll("\\", "/");
    function check(node) {
      const source = node.source?.value;
      if (typeof source !== "string" || (!source.startsWith("@/") && !source.startsWith(".")))
        return;
      const target = relative(
        root,
        source.startsWith("@/")
          ? resolve(root, source.slice(2))
          : resolve(dirname(context.filename), source),
      ).replaceAll("\\", "/");
      const from = current.split("/");
      const to = target.split("/");
      let allowed = to[0] !== "app" || from[0] === "app";
      if (to[0] === "features" && from[0] !== "app")
        allowed &&= from[0] === "features" && from[1] === to[1];
      if (from[0] === "content") allowed &&= to[0] === "content";
      if (from[0] === "components" && from[1] === "svg")
        allowed &&=
          (to[0] === "components" && to[1] === "svg") ||
          (to[0] === "shared" && to[1] === "drawn-layer");
      if (from[0] === "shared" && from[1] === "drawn-layer")
        allowed &&= to[0] === "shared" && to[1] === "drawn-layer";
      if (!allowed) context.report({ node, messageId: "boundary", data: { source } });
    }
    return {
      ImportDeclaration: check,
      ExportNamedDeclaration: check,
      ExportAllDeclaration: check,
      ImportExpression: check,
    };
  },
};

export default boundaries;
