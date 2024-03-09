import { ExtFile, Localization, UPLOADSTATUS } from "@files-ui/core"
import { OverridableComponentProps } from "../../../overridable";

export interface FileMosaicPropsMap extends OverridableComponentProps {
    /**
     * if true, and if the file is an image,
     * makes visible the "view" button that will get the image url
     * Also, it will be visible only when file is valid
     */
    preview?: boolean;
    /** 
     * If true, the info button will be visible
     * @default false
     */
    info?: boolean;
    /**
    * If true, a background blur image will be shown
    */
    backgroundBlurImage?: boolean;
    /**
    * If true, dark mode colors are used in the component.
    */
    darkMode?: boolean;
    /**
     * The language in which text labels are shown.
     * @default "EN-en"
     */
    localization?: Localization;
    /**
     * The current percentage of upload progress.
     * This value will have a higher priority over the upload progress value calculated inside the component.
     * @default undefined
     */
    progress?: number;
    /**
     * A reference to the XHR object that allows the upload, progress and abort events.
     */
    xhr?: XMLHttpRequest;
    /**
     * Callback fired when the see icon is clicked. If set, the see icon will be shown.
     */
    onSee?: (imageSource: string | undefined) => void;
    /**
     * Callback fired when the play icon is clicked. If set, the play icon will be shown.
     */
    onWatch?: (videoSource: File | string | undefined) => void;
    /**
     * Callback fired when the delete icon is clicked. If set, the delete icon will be shown.
     */
    onDelete?: (fileId: number | string | undefined) => void;
    /**
     * Callback fired when the abort icon is clicked. If set, the abort icon
        will be shown during the upload stage.
     */
    onAbort?: (fileId: number | string | undefined) => void;
    /**
     *         Callback fired when the cancel icon is clicked. If set, the cancel icon
        will be shown only before the upload stage has started during the preparing phase.
     */
    onCancel?: (fileId: number | string | undefined) => void;
    /**
     * Callback fired when the cancel icon is clicked. If set, the cancel icon
        will be shown only before the upload stage has started.
     */
    onDownload?: (fileId: number | string | undefined, downloadUrl?: string) => void;
    /**
     * Callback fired when the component is clicked if set.
     */
    onClick?: (evt: React.MouseEvent) => void;
    /**
     * Callback fired when the component is double clicked if set.
     */
    onDoubleClick?: (evt: React.MouseEvent) => void;
    /**
     * Callback fired when the component is right clicked if set.
     */
    onRightClick?: (evt: React.MouseEvent) => void;
    /**
     * Flag that determines whether actions are visible always, or only on hover event
     */
    alwaysActive?: boolean;
    /**
     * If present a tooltip that contains the upload message will be diplayed on hover
     */
    resultOnTooltip?: boolean;
    /**
     * If not present, image width will be set to 100%.
     * 
     * If present, image will be analized and displayed according to its heigh and width.
     * Image with height greater than its width has a "portrait" orientation.
     * Otherwise it has a "landscape" orientation.
     * - If value is "orientation", image will be displayed complete by giving 100% 
     * to width prop if the orientation is "landscape". 
     * When orientation is "portrait", height prop will be set to 100%. Some images 
     * will show an empty space.
     * - If value is "center", image will be centered and will not be displayed complete.
     * This the empty space is avoided. This is achived by giving 100% to width prop if 
     * the orientation is "portrait". When orientation is "landscape", height prop will be set to 100%.
     * @default orientation
     */
    smartImgFit?: false | "orientation" | "center";
}
//React.HTMLProps<HTMLDivElement>
export type FileMosaicProps =
    /*   {
        [D in keyof React.HTMLProps<HTMLDivElement>]: React.HTMLProps<HTMLDivElement>[D]
      } & */
      ExtFile &
    {
        [F in keyof FileMosaicPropsMap]: FileMosaicPropsMap[F]
    }
