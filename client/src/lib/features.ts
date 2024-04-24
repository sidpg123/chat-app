export const fileFormat = (url: string) => {
    const fileExtension = url.split(".").pop();

    if (fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg")
        return "video";

    if (fileExtension === "mp3" || fileExtension === "wa") return "audio";

    if (fileExtension === "png" ||
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "gif") return "image";

    return "file"
}

export const transformImage = (url:string = "", width:number = 100) => url;