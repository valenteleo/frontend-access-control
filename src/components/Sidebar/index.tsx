import { useState } from "react";
import { Stack, MenuList, MenuItem, Drawer, IconButton } from "@mui/material";
import { ROUTES } from "../../appConfig/routes";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/icons-material";

const useStyles = () => {
  return {
    menuList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      marginTop: "5rem",
      gap: 2,
      paddingX: "1rem",
    },
  };
};

const Sidebar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const styles = useStyles();
  const navigate = useNavigate();

  const menuList = [
    { label: "Cadastrar visitante", redirect: ROUTES.LOGIN },
    { label: "Cadastrar usuário", redirect: ROUTES.REGISTER },
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
              sx={{ width: "100%" }}
              onClick={() => navigate(items.redirect)}
            >
              {items.label}
            </MenuItem>
          ))}
        </MenuList>
      </Drawer>
    </Stack>
  );
};

export default Sidebar;
