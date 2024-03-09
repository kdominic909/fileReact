import * as React from "react";
import { parseSize } from "../utils/utils";
import { InfoBlackProps } from "./InfoBlackProps";
import { handleClickUtil } from "../../utils";

const InfoBlack: React.FC<InfoBlackProps> = (props: InfoBlackProps) => {
  const { size, color, colorFill, onClick, style, className } = props;
  const finalSize = parseSize(size);
  const finalStyle = style ? style : {};
  return (
    <svg
      className={className || ""}
      style={onClick ? { cursor: "pointer", ...finalStyle } : finalStyle}
      xmlns="http://www.w3.org/2000/svg"
      height={`${finalSize}px`}
      viewBox="0 0 24 24"
      width={`${finalSize}px`}
      fill={color || "#000000"}
      onClick={(e) => {
        handleClickUtil(e);
        onClick?.(e);
      }}
    >
      <path d="M0 0h24v24H0z" fill={colorFill || "none"} /> 
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
};
export default InfoBlack;
