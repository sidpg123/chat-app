import { Chat } from "../models/chat";
import { Message } from "../models/messages";
import { User } from "../models/user";
import { faker, simpleFaker } from "@faker-js/faker";

export const createUser = async (userNum: number) => {
    try {
        const usersPromise = [];

        for (let i = 0; i < userNum; i++) {
            const tempUser = User.create({
                name: faker.person.firstName(),
                username: faker.internet.email(),
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


const createSingleChat = async (numChats: number) => {
    try {
        const users = await User.find().select("_id");

        const chatsPromise = [];

        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                chatsPromise.push(
                    Chat.create({
                        name: faker.lorem.word(2),
                        members: [users[i], users[j]],
                    })
                )

            }
        }

        await Promise.all(chatsPromise);

        console.log("Chats created successfully")
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);

    }

}


const createGroupChats = async (numChat: number) => {
    try {
        const users = await User.find().select("_id");

        const chatsPromise = [];

        for (let i = 0; i < numChat; i++) {
            const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
            const members: any[] = [];


            for (let i = 0; i < numMembers; i++) {
                const randomIndex = Math.floor(Math.random() * users.length)
                const randomUser = users[randomIndex];

                if(!members.includes(randomUser)) {
                    members.push(randomUser)
                }
            }

            const chat = Chat.create({
                groupChat: true,
                name: faker.lorem.words(1),
                members,
                creator: members[0]
            });

            chatsPromise.push(chat)
            
        }

        await Promise.all(chatsPromise);

        console.log("Chats creatd successfully");
        process.exit();    
    } catch (error) {
        console.error(error)
        process.exit(1);
    }
}


const createMessages = async (numMessages: number) => {
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");

        const messagePromise:any[] = [];

        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomChat = users[Math.floor(Math.random() * chats.length)];


            messagePromise.push(
                Message.create({
                    chat: randomChat,
                    sender: randomUser,
                    contennt: faker.lorem.sentence()
                })
            )
        }

        await Promise.all(messagePromise);

        console.log("Messages created successfully");
        process.exit(1);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const createMessagesInChat = async (chatId: string ,numMessages: number) => {
    try {
        const users = await User.find().select("_id");

        const messagePromise:any[] = [];

        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];


            messagePromise.push(
                Message.create({
                    chat: chatId,
                    sender: randomUser,
                    content: faker.lorem.sentence()
                })
            )
        }

        await Promise.all(messagePromise);

        console.log("Messages created successfully");
        process.exit(1);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export {createGroupChats, createSingleChat, createMessages, createMessagesInChat}