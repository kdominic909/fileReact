import * as React from "react";
import { getURLFileIco, readAsDataURL, getURLFileIcoFromNameAndType } from "@files-ui/core"
import { IconsSet } from "../FilesUiProvider";

/**
 * Initializer hook for FileItemNeo
 * @param file The file Object
 * @param valid Whether the file is valid, not valid or not set
 * @param preview Whether to show a preview on FileItem
 * @param imageUrl The image url
 * @param xhr the xhr object
 * @param progress the current progress given by props
 * @returns an array thta contains the following properties [isImage, isVideo, url, imageSource, localProgress]
 */
export const useFileMosaicInitializer = (
    file: File | undefined,
    name: string | undefined,
    type: string | undefined,
    valid: boolean | undefined | null,
    preview: boolean,
    imageUrl: string | undefined,
    videoUrl: string | undefined,
    customIcons?: IconsSet,
    xhr?: XMLHttpRequest,

): [boolean, boolean, boolean, string, string | undefined, File | string | undefined] => {

    const [isImage, setIsImage] = React.useState<boolean>(false);
    const [isVideo, setIsVideo] = React.useState<boolean>(false);
    const [url, setUrl] = React.useState<string>("");
    const [imageSource, setImageSource] = React.useState<string | undefined>(undefined);
    const [videoSource, setVideoSource] = React.useState<File | string | undefined>(undefined);
    const [isReady, setIsReady] = React.useState(false);


    const init = async (
        file: File | undefined,
        name: string | undefined,
        type: string | undefined,
        valid: boolean | undefined | null,
        preview: boolean,
        imageUrl: string | undefined,
        videoUrl: string | undefined,
        customIcons?: IconsSet,
        xhr?: XMLHttpRequest,
        progress?: number
    ) => {
        //////////////////////////////
        //console.log("init", file, name, type);

        if (!file && (!name && !type)) return;

        const { url } = file ? getURLFileIco(file, customIcons) :
            getURLFileIcoFromNameAndType(name, type, customIcons);

        //console.log("init", url);

        setUrl(url);
        //In case is a video and also has a image preview
        if (imageUrl && videoUrl) {
            setIsVideo(true);
            setImageSource(imageUrl);
            setVideoSource(videoUrl);
            setIsReady(true);
            return;
        } else if (imageUrl) {
            setIsImage(true);
            setImageSource(imageUrl);
            setIsReady(true);
            return;
        } else if (videoUrl) {
            setIsVideo(true);
            setVideoSource(videoUrl);
            setIsReady(true);
        } else {
            //const [headerMime, tailMime] = getHeaderAndTail(file, type);
            const response = getHeaderAndTail(file, type);

            setIsImage(response[0] === "image");
            if (["mp4", "ogg", "webm"].includes(response[1]))
                setIsVideo(response[0] === "video");
            if (
                preview &&
                (valid || typeof valid === "undefined" || valid === null) &&
                response[0] === "image"
            ) {
                //lets check for image preview from File
                let response: string | undefined = undefined;
                if (file) {
                    response = await readAsDataURL(file);
                    if (response) {
                        setImageSource(response as string);
                    }
                }
                //console.log("response image", response);

            }
        }
        setIsReady(true);
        /////////////// UPLOAD OBJECT ///////////////

        //if (!localProgress) {
        //handleProgress(1);
        //}
    };



    //////   CLEAN UP
    React.useEffect(() => {
        init(file, name, type, valid, preview || false, imageUrl, videoUrl, customIcons);
        return () => {
            setImageSource(undefined);
            setIsImage(false);
            setIsVideo(false);
            setIsReady(false);
        };
        // eslint-disable-next-line
    }, [file, name, type, valid, preview, imageUrl, videoUrl, customIcons]);

    return [isReady, isImage, isVideo, url, imageSource, videoSource];
}

/* export const identifyFileSource = (file: File | undefined, name: string, fileType: string) => {
    if(!file){

    }
} */

const getHeaderAndTail = (
    file: File | undefined,
    type: string | undefined,
): [string, string] => {

    if (file) {
        if (file.type) {
            const splittedType: string[] = file.type.split("/");
            return [splittedType[0], splittedType[1]];
        } else {
            return ["octet", "octet"];
        }
    } else {
        const splittedType: string[] | undefined = type?.split("/");
        if (splittedType && splittedType.length > 1) {
            return [splittedType[0], splittedType[1]];
        } else {
            return ["octet", "octet"];
        }
    }


}