import * as React from "react";
import useMaterialButtonClassName from "./hooks/useMaterialButtonClassName";
import { MaterialButtonProps } from "./MaterialButtonProps";
import "./MaterialButton.scss";
import { addClassName, FileIdGenerator } from "@files-ui/core";
import { FilesUiContext } from "../FilesUiProvider/FilesUiContext";
import { createRippleButton } from "../utils";

const MaterialButton: React.FC<MaterialButtonProps> = (
  props: MaterialButtonProps
) => {
  const {
    disabled,
    href,
    textTransform: textDecoration,
    variant = "contained",
    color = "#1976d2",
    textColor = "white",
    children,
    className,
    style,
    onClick,
    resetStyles,
    disableRipple,
    darkMode: darkModeProp,
    id,
    ...rest
  } = props;
  //context
  const { darkMode: darkModeContext } = React.useContext(FilesUiContext);
  const darkMode: boolean | undefined =
    darkModeProp !== undefined ? darkModeProp : darkModeContext;

  //  const idClassName = React.useId();
  const idClassName = React.useMemo(() => id ||FileIdGenerator.getNextId() + "", [id]);

  const materialButtonClassName: string | undefined =
    useMaterialButtonClassName(
      variant,
      disabled,
      color,
      textColor,
      textDecoration,
      className,
      idClassName.replace(":", "").replace(":", ""),
      resetStyles
    );
  const finalMBClassNameDarkMode: string | undefined =
    materialButtonClassName && darkMode
      ? addClassName(materialButtonClassName, `darkmode`)
      : materialButtonClassName;

  //console.log("finalMBClassNameDarkMode", finalMBClassNameDarkMode, darkMode);
  function handleClick<T extends HTMLAnchorElement | HTMLButtonElement>(
    e: React.MouseEvent<T, MouseEvent>
  ): void {
    e.preventDefault();

    //ripple
    if (!disableRipple)
      createRippleButton(e, variant as string, color as string);

    onClick?.(e as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  }

  if (finalMBClassNameDarkMode !== undefined || resetStyles)
    return React.createElement(href ? "a" : "button", {
      className:
        resetStyles && className ? className : finalMBClassNameDarkMode,
      "data-testid": href ? "dui-anchor" : "dui-button",
      onClick: handleClick,
      href: href,
      style: style,
      children: <span className="material-button-label">{children}</span>,
      disabled: disabled,
      ...rest
    });
  else return <React.Fragment>loading styes</React.Fragment>;
};
export default MaterialButton;
