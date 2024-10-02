import { forwardRef } from "react";
import {
  ButtonBase,
  ButtonBaseProps,
  CircularProgress,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import { CustomButtonTypes, CustomButtonVariant } from "./CustomButtonVariant";
import { FileDownloadOutlined } from "@mui/icons-material";

interface CustomButtonProps extends ButtonBaseProps {
  title: string;
  variant?: CustomButtonTypes;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const CustomButton = forwardRef<ButtonBase, CustomButtonProps>(
  (
    {
      title,
      variant = CustomButtonVariant.CONTAINED,
      ...props
    }: CustomButtonProps,
    ref
  ) => {
    const theme = useTheme();

    const isContained = variant.startsWith(CustomButtonVariant.CONTAINED);

    const isContainedDisabled = variant.endsWith("loading");

    const isDisabled = variant === CustomButtonVariant.DISABLED;

    const iconVariant = (): React.ReactNode => {
      switch (variant) {
        case CustomButtonVariant.CONTAINED_LOADING:
          return (
            <CircularProgress
              size={16}
              sx={{
                color: theme.palette.background.paper,
              }}
            />
          );

        case CustomButtonVariant.OUTLINED_LOADING:
          return (
            <CircularProgress
              size={16}
              sx={{
                color: theme.palette.grey[700],
              }}
            />
          );
        case CustomButtonVariant.CONTAINED_DOWNLOAD:
          return <SvgIcon component={FileDownloadOutlined} />;
        case CustomButtonVariant.OUTLINED_DOWNLOAD:
          return <SvgIcon component={FileDownloadOutlined} />;
        case CustomButtonVariant.OUTLINED:
          return null;
        default:
          return null;
      }
    };

    return (
      <ButtonBase
        disabled={isDisabled || isContainedDisabled}
        sx={{
          ...props.sx,
          display: "flex",
          gap: 1,
          minWidth: "6rem",
          backgroundColor: isDisabled
            ? theme.palette.grey[300]
            : isContained
            ? theme.palette.grey[700]
            : "transparent",
          color: isContained || isDisabled ? "white" : theme.palette.grey[700],
          border:
            isContained || isDisabled
              ? "none"
              : `1px solid ${theme.palette.grey[700]}`,
          borderRadius: "4px",
          padding: ".5rem 1rem",
        }}
        {...props}
        ref={ref}
      >
        {iconVariant()}
        <Typography
          sx={{ fontWeight: 600, fontSize: 14, fontFamily: "Poppins" }}
        >
          {String(title)}
        </Typography>
      </ButtonBase>
    );
  }
);

export default CustomButton;
