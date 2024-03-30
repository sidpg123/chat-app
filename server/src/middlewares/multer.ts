import multer from "multer";

const multerUpload = multer({limits: {
    fileSize: 1024 * 1024 * 5
}})


export const singleUpload = multerUpload.single("avatar");

export const attachmentMulter = multerUpload.array("files", 5);