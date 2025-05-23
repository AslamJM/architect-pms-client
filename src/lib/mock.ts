import type { UploadType } from "@/types/project";

export function createMockUrl (filename:string,type:UploadType,projectId:string) {

    const dir = type==="RENDERED_IMAGES"?"rendered-images":type==="UPLOADED_FILES"?"uploaded-files":"working-files"

    return `https://myupload-server.corn/${projectId}/${dir}/${filename}`
}

export function getFileNameFromUrl (url:string) {
    return url.split("/").at(-1)
}