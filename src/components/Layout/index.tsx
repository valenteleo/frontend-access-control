import { Box, Theme, useTheme } from "@mui/material";
import AppBar from "../AppBar";

const useStyles = () => {
  return {
    content: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      padding: "7rem 2rem 2rem 2rem",
      gap: 2,
    },
  };
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme: Theme = useTheme();
  const styles = useStyles();

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[200] }}>
      <AppBar />

      <Box sx={styles.content}>{children}</Box>
    </Box>
  );
};

export default Layout;
