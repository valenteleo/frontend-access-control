import { CodeOffOutlined, CodeOutlined, Logout } from "@mui/icons-material";
import {
  Avatar,
  Typography,
  IconButton,
  Stack,
  Box,
  Theme,
  useTheme,
} from "@mui/material";
import Sidebar from "../Sidebar";

const useStyles = (theme: Theme) => {
  return {
    appBar: {
      display: "flex",
      padding: "1.5rem",
      backgroundColor: theme.palette.background.paper,
      position: "fixed",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      zIndex: 1,
    },
  };
};

const AppBar: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Box sx={styles.appBar}>
      <Sidebar />

      <Stack direction="row" gap={0.3}>
        <CodeOutlined htmlColor={theme.palette.grey[600]} />
        <Typography color={theme.palette.grey[600]}>
          Bem-vindo, Leonardo!
        </Typography>
        <CodeOffOutlined htmlColor={theme.palette.grey[600]} />
      </Stack>

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
