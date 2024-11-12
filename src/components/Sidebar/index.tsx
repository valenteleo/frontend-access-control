import { useEffect, useState } from "react";
import {
  Stack,
  MenuList,
  MenuItem,
  Drawer,
  IconButton,
  Box,
  useTheme,
  Theme,
} from "@mui/material";
import { ROUTES } from "../../appConfig/routes";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CalendarMonthOutlined,
  GroupOutlined,
  HomeOutlined,
  Menu,
  PersonAddAltOutlined,
  QrCodeOutlined,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = (theme: Theme) => {
  return {
    menuList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      gap: 2,
      paddingX: "1rem",
    },
    iconSideBar: {
      display: "flex",
      padding: "1.5rem",
      backgroundColor: theme.palette.grey[200],
      borderRadius: "50%",
    },
  };
};

interface IMenuList {
  title: string;
  redirectTo: string;
  startIcon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [menu, setMenu] = useState<IMenuList[]>([]);

  const { userData } = useAuth();

  const location = useLocation();
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigate = useNavigate();

  const selectedPath = (path: string): string => {
    return location.pathname.includes(path)
      ? theme.palette.error.light
      : theme.palette.grey[600];
  };

  const menuList: IMenuList[] = [
    {
      title: "Início",
      redirectTo: ROUTES.HOME,
      startIcon: <HomeOutlined htmlColor={selectedPath(ROUTES.HOME)} />,
    },
    {
      title: "Cadastrar usuário",
      redirectTo: ROUTES.REGISTER().USER,
      startIcon: (
        <PersonAddAltOutlined
          htmlColor={selectedPath(ROUTES.REGISTER().USER)}
        />
      ),
    },
    {
      title: "Gerar QR Code",
      redirectTo: ROUTES.GENERATE,
      startIcon: <QrCodeOutlined htmlColor={selectedPath(ROUTES.GENERATE)} />,
    },
    {
      title: "Cadastrar visita",
      redirectTo: ROUTES.REGISTER().VISIT,
      startIcon: (
        <CalendarMonthOutlined
          htmlColor={selectedPath(ROUTES.REGISTER().VISIT)}
        />
      ),
    },
    {
      title: "Usuários",
      redirectTo: ROUTES.USERS,
      startIcon: <GroupOutlined htmlColor={selectedPath(ROUTES.USERS)} />,
    },
  ];

  useEffect(() => {
    const userIsAdmin = userData.perfil === 0;

    if (!userIsAdmin) {
      const filtered = menuList.filter(
        (items) =>
          items.title !== "Cadastrar usuário" && items.title !== "Usuários"
      );

      setMenu(filtered);
    } else {
      setMenu(menuList);
    }
  }, []);

  return (
    <Stack>
      <IconButton onClick={() => setOpenDrawer(true)}>
        <Menu />
      </IconButton>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Stack alignItems={"center"} mt={2} mb={2}>
          <Box sx={styles.iconSideBar}>
            <QrCodeOutlined
              sx={{ fontSize: "2.5rem" }}
              htmlColor={theme.palette.grey[600]}
            />
          </Box>
        </Stack>
        <MenuList sx={styles.menuList}>
          {menu.map((items, index) => (
            <MenuItem
              key={index}
              sx={{
                width: "100%",
                fontFamily: "Poppins",
                color: selectedPath(items.redirectTo),
                borderRadius: "4px",
                backgroundColor: location.pathname.includes(items.redirectTo)
                  ? "rgba(238, 31, 31, .2)"
                  : "transparent",
              }}
              onClick={() => navigate(items.redirectTo)}
            >
              <Box sx={{ marginRight: 1 }}>{items.startIcon}</Box>
              {items.title}
            </MenuItem>
          ))}
        </MenuList>
      </Drawer>
    </Stack>
  );
};

export default Sidebar;
