import { ContactSupportRounded } from "@mui/icons-material";

type sampleUsersType = {
    avatar: string[];
    name: string;
    _id: string;
    isAdded?: boolean
}[]

export const samplechats = [{
    avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
    name: "Sakshi",
    _id: "1",
    groupChat: false,
    members: ["1", "2", "3"]
}, {
    avatar: ['https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar2.png', 'https://www.w3schools.com/w3images/avatar2.png', 'https://www.w3schools.com/w3images/avatar6.png',],
    name: "ZS3",
    _id: "2",
    groupChat: true,
    members: ["1", "2", "3"]
}
]

export const sampleUsers:sampleUsersType = [{
    avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
    name: "siddharth",
    _id: "1",
}, {
    avatar: ['https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar2.png', 'https://www.w3schools.com/w3images/avatar2.png', 'https://www.w3schools.com/w3images/avatar6.png',],
    name: "sakshi",
    _id: "2",
}, {
    avatar: ['https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar2.png', 'https://www.w3schools.com/w3images/avatar2.png', 'https://www.w3schools.com/w3images/avatar6.png',],
    name: "Dhairya",
    _id: "3",
}
]


export const sampleNotifications = [{
    sender: {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
        name: "siddharth",
    },
    _id: "1",
}, {
    sender: {
        avatar: ['https://www.w3schools.com/howto/img_avatar.png', 'https://www.w3schools.com/howto/img_avatar2.png', 'https://www.w3schools.com/w3images/avatar2.png', 'https://www.w3schools.com/w3images/avatar6.png',],
        name: "sakshi",
    },
    _id: "2",
},
]
export interface Attachment {
    public_id: string;
    url: string;
}

export interface Sender {
    _id: string;
    name: string;
}

export interface Message {
    attachments: Attachment[];
    content: string;
    _id: string;
    sender: Sender;
    chat: string;
    createdAt: string; // You may want to use a Date type instead
}
export const sampleMessage: Message[] = [
    {
        attachments: [
        ],
        content: "Hello sid, what's going on?",
        _id: "laksdjfasdf",
        sender: {
            _id: "user._id",
            name: "sakshi",
        },
        chat: "chatId",
        createdAt: "2024-04-23T18:30:00.000Z"
    },
    {
        attachments: [],
        content: `I am good. Where are you?`,
        _id: "asdfklajsd",
        sender: {
            _id: "lskdjfsdifjlasdj",
            name: "Adinath",
        },
        chat: "chatId",
        createdAt: "2024-04-23T19:00:00.000Z"
    },
    {
        attachments: [
            {
                public_id: "qwerty",
                url: "https://www.collegebatch.com/static/clg-gallery/kits-college-of-engineering-kolhapur-274733.jpg"
            }
        ],
        content: "I am at KITCOEK",
        _id: "qweasdzxc",
        sender: {
            _id: "user._id",
            name: "sakshi",
        },
        chat: "chatId",
        createdAt: "2024-04-23T20:15:00.000Z"
    }
];
