import {
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import SelectCustom from "../../components/SelectCustom";
import React, { Fragment, SetStateAction, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { IFilters } from ".";
import { Close } from "@mui/icons-material";
import { useVisits } from "../../contexts/VisitsContext";
import { useAuth } from "../../contexts/AuthContext";

type Filters = "status" | "users";

interface IDrawerFilterProps {
  filterStatus: IFilters;
  setFilterStatus: React.Dispatch<SetStateAction<IFilters>>;
}

const DrawerFilter: React.FC<IDrawerFilterProps> = ({
  filterStatus,
  setFilterStatus,
}) => {
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useState(false);

  const { userData } = useAuth();
  const { usersOption } = useVisits();

  const isAdmin = userData.perfil === 0;

  const optionsFilterStatus = [
    { value: "agendado", label: "Agendado" },
    { value: "atendido", label: "Atendido" },
    { value: "omisso", label: "Omisso" },
    { value: "cancelado", label: "Cancelado" },
  ];

  const handleStatus = (value: string, filter: Filters) => {
    if (filter === "status") {
      setFilterStatus((prevState) => ({
        ...prevState,
        status: value,
      }));
    }

    if (filter === "users") {
      setFilterStatus((prevState) => ({
        ...prevState,
        user: value,
      }));
    }
  };

  return (
    <Fragment>
      <CustomButton title="Filtros" onClick={() => setOpenDrawer(true)} />

      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={() => setOpenDrawer(false)}
      >
        <Stack p={[2, 1.5]} gap={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "Poppins",
                color: theme.palette.grey[700],
              }}
            >
              Filtros
            </Typography>

            <IconButton onClick={() => setOpenDrawer(false)}>
              <Close />
            </IconButton>
          </Stack>

          <Divider sx={{ marginX: "-2.5rem" }} />

          <Stack px="1.5rem" gap={2}>
            <SelectCustom
              label="Status"
              value={filterStatus.status}
              onChange={({ target }) => handleStatus(target.value, "status")}
              options={optionsFilterStatus}
              style={{ width: "15rem" }}
            />

            {isAdmin && (
              <SelectCustom
                label="Usuário"
                value={filterStatus.user}
                onChange={({ target }) => handleStatus(target.value, "users")}
                options={usersOption}
                style={{ width: "15rem" }}
              />
            )}
          </Stack>
        </Stack>
      </Drawer>
    </Fragment>
  );
};

export default DrawerFilter;
