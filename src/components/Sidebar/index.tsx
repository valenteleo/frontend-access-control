import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import {
  CalendarMonthOutlined,
  HomeOutlined,
  HowToRegOutlined,
  Menu,
  QrCodeOutlined,
} from "@mui/icons-material";

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

  const theme = useTheme();
  const styles = useStyles();
  const navigate = useNavigate();

  const menuList: IMenuList[] = [
    {
      title: "Início",
      redirectTo: ROUTES.HOME,
      startIcon: <HomeOutlined htmlColor={theme.palette.grey[600]} />,
    },
    {
      title: "Cadastrar usuário",
      redirectTo: ROUTES.REGISTER().USER,
      startIcon: <HowToRegOutlined htmlColor={theme.palette.grey[600]} />,
    },
    {
      title: "Gerar QR Code",
      redirectTo: ROUTES.GENERATE,
      startIcon: <QrCodeOutlined htmlColor={theme.palette.grey[600]} />,
    },
    {
      title: "Cadastrar visita",
      redirectTo: ROUTES.REGISTER().VISIT,
      startIcon: <CalendarMonthOutlined htmlColor={theme.palette.grey[600]} />,
    },
  ];

  return (
    <Stack>
      <IconButton onClick={() => setOpenDrawer(true)}>
        <Menu />
      </IconButton>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <MenuList sx={styles.menuList}>
          {menuList.map((items, index) => (
            <MenuItem
              key={index}
              sx={{ width: "100%", fontFamily: "Poppins" }}
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
