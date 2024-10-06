import { useEffect, useState } from "react";
import {
  Stack,
  MenuList,
  MenuItem,
  Drawer,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import { ROUTES } from "../../appConfig/routes";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CalendarMonthOutlined,
  HomeOutlined,
  HowToRegOutlined,
  Menu,
  QrCodeOutlined,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = () => {
  return {
    menuList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      gap: 2,
      paddingX: "1rem",
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
  const styles = useStyles();
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
        <HowToRegOutlined htmlColor={selectedPath(ROUTES.REGISTER().USER)} />
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
  ];

  useEffect(() => {
    const userIsAdmin = userData.perfil === 0;

    if (!userIsAdmin) {
      const filtered = menuList.filter(
        (items) => items.title !== "Cadastrar usuário"
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
        <MenuList sx={styles.menuList}>
          {menu.map((items, index) => (
            <MenuItem
              key={index}
              sx={{
                width: "100%",
                fontFamily: "Poppins",
                color: selectedPath(items.redirectTo),
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
