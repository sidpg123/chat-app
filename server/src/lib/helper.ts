import { userSockerIDs } from ".."


export const otherUser = (members: any, userId: any ) => {
    return members.find((member: any) => member._id.toString() !== userId.toString())
    
}

interface users {
    _id: string,
    name: string
}

export const getSockets = (users:users[] = []) => {
    const sockets =  users.map((user) => userSockerIDs.get(user._id.toString()))
    return sockets;
}
