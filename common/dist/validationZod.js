"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginInput = exports.registerInput = void 0;
const zod_1 = require("zod");
exports.registerInput = zod_1.z.object({
    username: zod_1.z.string().email().min(1, "please enter email"),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(1, "Please enter your name"),
    bio: zod_1.z.string().min(2, "Please enter Bio")
});
exports.loginInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
