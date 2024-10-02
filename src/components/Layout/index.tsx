import { Box, Theme, useTheme } from "@mui/material";
import AppBar from "../AppBar";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = (theme: Theme) => {
  return {
    content: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      padding: "7rem 2rem 2rem 2rem",
      gap: 2,
    },
    accessDate: {
      fontSize: 12,
      color: theme.palette.grey[500],
      fontFamily: "Poppins",
    },
  };
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const theme: Theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Box>
      {isAuthenticated && <AppBar />}

      <Box sx={styles.content}>{children}</Box>
    </Box>
  );
};

export default Layout;
