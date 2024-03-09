import * as React from "react";

import { CheckCircle, CloudDone, DoDisturb, UploadError } from "../../../icons";
import { FileMosaicStatusProps } from "./FileMosaicStatusProps";
import "./FileMosaicStatus.scss";
import { FileItemLocalizerSelector, LocalLabels } from "@files-ui/core"

const FileMosaicStatus: React.FC<FileMosaicStatusProps> = (
  props: FileMosaicStatusProps
) => {
  const { valid, uploadStatus, localization, style } = props;

  const FileItemStatusLocalizer: LocalLabels = FileItemLocalizerSelector(
    localization
  ).status as LocalLabels;

  if (uploadStatus === "success") {
    return (
      <div className="files-ui-file-item-status-container file-status-ok" style={style}>
        <CloudDone color="#4caf50" size="small" className="status-icon" />
        {FileItemStatusLocalizer.success as string}
      </div>
    );
  }
  if (uploadStatus === "error" || uploadStatus === "aborted") {
    return (
      <div className="files-ui-file-item-status-container file-status-error" style={style}>
        <UploadError
          color="#f44336"
          size="semi-medium"
          className="status-icon"
        />
        {FileItemStatusLocalizer.error as string}
      </div>
    );
  }
  if (valid !== undefined && valid !== null) {
    if (valid) {
      return (
        <div className="files-ui-file-item-status-container file-status-ok" style={style}>
          <CheckCircle color="#4caf50" size="small" className="status-icon" />
          {FileItemStatusLocalizer.valid as string}
        </div>
      );
    } else {
      return (
        <div className="files-ui-file-item-status-container file-status-error" style={style}>
          <DoDisturb color="#f44336" size="small" className="status-icon" />
          {FileItemStatusLocalizer.denied as string}
        </div>
      );
    }
  }
  return <></>;
};
export default FileMosaicStatus;
