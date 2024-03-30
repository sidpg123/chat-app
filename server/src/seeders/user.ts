import { User } from "../models/user";
import { faker } from "@faker-js/faker";

export const createUser = async (userNum: number) => {
    try {
        const usersPromise = [];

        for (let i = 0; i < userNum; i++) {
            const tempUser = User.create({
                name: faker.person.firstName(),
                username: faker.internet.userName(),
                bio: faker.lorem.lines(3),
                password: "password",
                avatar: {
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName()
                }
            });

            usersPromise.push(tempUser);

            console.log("User created:", i + 1);
        }

        // Wait for all user creation promises to resolve
        const users = await Promise.all(usersPromise);
        console.log("All users created:", users);

    } catch (error) {
        console.error("Error creating users:", error);
        process.exit(1);
    }
}
