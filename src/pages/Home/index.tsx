import { useEffect, useState } from "react";
import { Card, DatePicker, Divider } from "antd";
import Layout from "../../components/Layout";
import TitleBarPage from "../../components/TitleBarPage";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { homeHeaderColumns } from "./HomeHeaderColumns";
import { HomeOutlined, MoreVertOutlined } from "@mui/icons-material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import DynamicCells from "./DynamicCells";
import SelectCustom from "../../components/SelectCustom";
import WithoutVisit from "./WithoutVisits";
import { ArrayIsEmpty } from "../../utils";
import { useAuth } from "../../contexts/AuthContext";
import { capitalize } from "../../utils/format";
import { useIoCContext } from "../../contexts/IoCContext";
import { IVisitsService, ScheduledVisits } from "../../modules/visits/models";
import { Types } from "../../ioc/types";
import useDialogAlert from "../../hooks/useDialogAlert";
import { AppError } from "../../utils/AppError";
import moment from "moment";
interface StyledMenuProps {
  data: ScheduledVisits;
}

const Home: React.FC = () => {
  const [clientsData, setClientsData] = useState<ScheduledVisits[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const { serviceContainer } = useIoCContext();
  const { userData } = useAuth();
  const { snackbar } = useDialogAlert();
  const { RangePicker } = DatePicker;

  const theme = useTheme();

  const visitsService = serviceContainer.get<IVisitsService>(
    Types.Visits.IVisitsService
  );
  const isDataEmpty = ArrayIsEmpty(clientsData);

  const optionsFilterStatus = [
    { value: "agendado", label: "Agendado" },
    { value: "atendido", label: "Atendido" },
    { value: "omisso", label: "Omisso" },
    { value: "cancelado", label: "Cancelado" },
  ];

  const fetchScheduledVisits = async () => {
    try {
      const response = await visitsService.getScheduledVisits(
        userData.usuario_id,
        startDate,
        endDate,
        filterStatus
      );

      setClientsData(response.clientes);
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({
          message: `Error: ${error.message}`,
          variant: "error",
        });
      }
    }
  };

  const updateStatus = async (id: number, datavis: string) => {
    try {
      const formattedData = moment(datavis).format("YYYY-MM-DD");

      await visitsService.updateVisitStatus(id, formattedData);
      fetchScheduledVisits();

      snackbar({
        message: "Agendamento cancelado!",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({
          message: `Error: ${error.message}`,
          variant: "error",
        });
      }
    }
  };

  const StyledMenu: React.FC<StyledMenuProps> = ({ data }: StyledMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleAlert = () => {
      alert(data.nome);
    };

    return (
      <Box>
        <IconButton onClick={handleClick}>
          <MoreVertOutlined />
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            sx={{ fontFamily: "Poppins", fontSize: 13 }}
            onClick={handleAlert}
          >
            Editar agendamento
          </MenuItem>

          <MenuItem
            sx={{ fontFamily: "Poppins", fontSize: 13 }}
            onClick={() => updateStatus(data.cliente_id, data.datavis)}
          >
            Cancelar agendamento
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  useEffect(() => {
    fetchScheduledVisits();
  }, [endDate, filterStatus]);

  return (
    <Layout>
      <TitleBarPage
        title="Visitas agendadas"
        icon={<HomeOutlined htmlColor={theme.palette.grey[600]} />}
      />

      <Card>
        <Stack direction="row" justifyContent="space-between">
          <TitleAndSubtitle
            title={`Olá, ${capitalize(userData?.nome)}!`}
            subtitle="Confira sua agenda de visitas marcadas."
          />

          {!isDataEmpty && (
            <Stack direction="row" flexWrap="wrap-reverse" gap={2}>
              <Box>
                <Typography
                  sx={{
                    color: theme.palette.grey[600],
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: ".9rem",
                  }}
                >
                  Período
                </Typography>
                <RangePicker
                  size="large"
                  format="DD/MM/YYYY"
                  onChange={(value) => {
                    const [startDate, endDate] = value!;
                    setStartDate(startDate!.format("YYYY-MM-DD"));
                    setEndDate(endDate!.format("YYYY-MM-DD"));
                  }}
                  style={{
                    borderColor: theme.palette.grey[400],
                    fontFamily: "Poppins",
                    borderRadius: "4px",
                  }}
                  placeholder={["Data de início", "Data de término"]}
                />
              </Box>

              <SelectCustom
                label="Status"
                style={{ minWidth: "15rem" }}
                onChange={({ target }) => {
                  setFilterStatus(target.value);
                }}
                options={optionsFilterStatus}
              />
            </Stack>
          )}
        </Stack>

        <Divider />

        {!isDataEmpty ? (
          <Table>
            <TableHead>
              <TableRow>
                {homeHeaderColumns.map((items, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: "600",
                      fontFamily: "Poppins",
                      color: theme.palette.grey[700],
                    }}
                  >
                    {items}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {clientsData.map((items, index) => (
                <TableRow key={index}>
                  <DynamicCells items={items} />

                  <TableCell align="right">
                    <StyledMenu data={items} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <WithoutVisit />
        )}
      </Card>
    </Layout>
  );
};

export default Home;
