

export const otherUser = (members: any, userId: any ) => {
    return members.find((member: any) => member._id.toString() !== userId.toString())
    
}


