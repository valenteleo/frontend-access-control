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
    { label: title, sx: { fontSize: 14 } },
    { label: subtitle, sx: { fontSize: 12 } },
  ];

  return (
    <Box {...props}>
      {descriptions.map((item, index) => (
        <Typography
          key={index}
          sx={{
            fontFamily: "Poppins",
            color: theme.palette.grey[600],
            ...item.sx,
          }}
        >
          {item.label}
        </Typography>
      ))}
    </Box>
  );
};

export default TitleAndSubtitle;
