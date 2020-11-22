import * as assert from "assert";
import { useApi } from "../..";
import type ExampleController from "./pages/api/example";
import type Example2Controller from "./pages/api/example2";

const controller = useApi<ExampleController>("example", "http://localhost:3000");

describe("useApi", () => {
    it("should invoke get method", async () => {
        const data = await controller.get({ foo: "World" });
        assert.deepStrictEqual(data, { bar: "Hello, World" });
    });

    it("should invoke post method", async () => {
        const data = await controller.post({ foo: "World" });
        assert.deepStrictEqual(data, { bar: "Hello, World" });
    });

    it("should invoke delete method", async () => {
        const data = await controller.delete({ foo: "Hello" }, { bar: "World" });
        assert.deepStrictEqual(data, { foo: "Hello", bar: "World" });
    });

    it("should invoke options method", async () => {
        const data = await controller.options({ foo: "World" });
        assert.deepStrictEqual(data, { bar: "Hello, World" });
    });

    it("should invoke patch method with query and body", async () => {
        const data = await controller.patch({ foo: "Hello" }, { bar: "World" });
        assert.deepStrictEqual(data, { foo: "Hello", bar: "World" });
    });

    it("should invoke put method with query and body", async () => {
        const data = await controller.put({ foo: "Hello" }, { bar: "World" });
        assert.deepStrictEqual(data, { foo: "Hello", bar: "World" });
    });

    it("should throw error if method is not implemented", async () => {
        let err: Error;

        try {
            const controller = useApi<Example2Controller>("example2",
                "http://localhost:3000");
            await controller["put"]({}, {});
        } catch (e) {
            err = e;
        }

        assert.strictEqual(err.name, "ReferenceError");
        assert.strictEqual(err.message, "ApiController.put is not implemented");
    });
});
