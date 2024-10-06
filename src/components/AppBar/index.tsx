import { Logout } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Box, Theme, useTheme } from "@mui/material";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import { useAuth } from "../../contexts/AuthContext";
import {
  IAuthenticationService,
  IUserData,
} from "../../modules/authentication/models";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import useDialogAlert from "../../hooks/useDialogAlert";

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
  const { setIsAuthenticated, setUserData, setRedirectByLogout, userData } =
    useAuth();
  const { serviceContainer } = useIoCContext();
  const { snackbar } = useDialogAlert();

  const theme = useTheme();
  const styles = useStyles(theme);
  const navigate = useNavigate();

  const authenticationService = serviceContainer.get<IAuthenticationService>(
    Types.Authentication.IAuthenticationService
  );

  const handleLogout = async () => {
    try {
      await authenticationService.logout();

      setIsAuthenticated(false);
      setUserData({} as IUserData);
      setRedirectByLogout(true);
      navigate(ROUTES.LOGIN);

      snackbar({ message: "Até mais!", variant: "success" });
    } catch {
      snackbar({
        message: "Houve um erro ao fazer o logout",
        variant: "error",
      });
    }
  };

  return (
    <Box sx={styles.appBar}>
      <Sidebar />

      <Stack direction="row" gap={2}>
        <IconButton onClick={handleLogout}>
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
