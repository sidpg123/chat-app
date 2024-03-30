export interface alert {
    ALERT: string,
    REFETCH_CHAT: string
}

//chat.ts constrolers


interface Attachment {
    filename: string;
    filePath: string;
    mimeType: string;
    size: number;
}


//auth


export interface CustomRequest extends Request {
    user: any; // Or a more specific type for decoded user data
}
 