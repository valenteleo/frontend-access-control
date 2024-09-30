import { Logout } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Box, Theme, useTheme } from "@mui/material";
import Sidebar from "../Sidebar";

const useStyles = (theme: Theme) => {
  return {
    appBar: {
      display: "flex",
      flexWrap: "wrap",
      padding: "1.5rem",
      backgroundColor: theme.palette.background.paper,
      position: "fixed",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      zIndex: 99,
    },
  };
};

const AppBar: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Box sx={styles.appBar}>
      <Sidebar />

      <Stack direction="row" gap={2}>
        <IconButton>
          <Logout />
        </IconButton>

        <Avatar sx={{ backgroundColor: theme.palette.error.light }}>L</Avatar>
      </Stack>
    </Box>
  );
};

export default AppBar;
