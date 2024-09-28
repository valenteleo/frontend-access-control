import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import React from "react";

interface TitleAndSubtitleProps extends BoxProps {
  title: string;
  subtitle?: string;
}

const TitleAndSubtitle: React.FC<TitleAndSubtitleProps> = ({
  title,
  subtitle,
  ...props
}: TitleAndSubtitleProps) => {
  const theme = useTheme();

  const descriptions = [
    { label: title, sx: { fontSize: 14, color: theme.palette.grey[600] } },
    { label: subtitle, sx: { fontSize: 12, color: theme.palette.grey[600] } },
  ];

  return (
    <Box {...props}>
      {descriptions.map((item, index) => (
        <Typography key={index} sx={item.sx}>
          {item.label}
        </Typography>
      ))}
    </Box>
  );
};

export default TitleAndSubtitle;
