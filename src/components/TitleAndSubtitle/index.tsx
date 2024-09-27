import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

interface TitleAndSubtitleProps {
  title: string;
  subtitle?: string;
}

const TitleAndSubtitle: React.FC<TitleAndSubtitleProps> = ({
  title,
  subtitle,
}: TitleAndSubtitleProps) => {
  const theme = useTheme();

  const descriptions = [
    { label: title, sx: { fontSize: 14, color: theme.palette.grey[600] } },
    { label: subtitle, sx: { fontSize: 12, color: theme.palette.grey[600] } },
  ];

  return (
    <Box>
      {descriptions.map((item, index) => (
        <Typography key={index} sx={item.sx}>
          {item.label}
        </Typography>
      ))}
    </Box>
  );
};

export default TitleAndSubtitle;
