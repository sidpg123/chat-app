"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginInput = exports.registerInput = void 0;
const zod_1 = require("zod");
exports.registerInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    passowrd: zod_1.z.string().min(6),
    name: zod_1.z.string().optional()
});
exports.loginInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    passowrd: zod_1.z.string().min(6),
});
