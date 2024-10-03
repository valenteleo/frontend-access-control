import { Logout } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Box, Theme, useTheme } from "@mui/material";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import { useAuth } from "../../contexts/AuthContext";
import { IUserData } from "../../modules/authentication/models";

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
  const { setIsAuthenticated, setUserData, userData } = useAuth();

  const theme = useTheme();
  const styles = useStyles(theme);
  const navigate = useNavigate();

  const logout = () => {
    setIsAuthenticated(false);
    setUserData({} as IUserData);
    navigate(ROUTES.LOGIN);
  };

  return (
    <Box sx={styles.appBar}>
      <Sidebar />

      <Stack direction="row" gap={2}>
        <IconButton onClick={logout}>
          <Logout />
        </IconButton>

        <Avatar sx={{ backgroundColor: theme.palette.error.light }}>
          {userData?.nome.toLocaleUpperCase().charAt(0)}
        </Avatar>
      </Stack>
    </Box>
  );
};

export default AppBar;
