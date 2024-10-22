import { Fragment, useEffect, useState } from "react";
import { DatePicker, Divider } from "antd";
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
  Card,
  TableContainer,
  CircularProgress,
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
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";
import CustomButton from "../../components/CustomButton";
import { downloadXLSX } from "../../utils/download";
import moment from "moment";
interface StyledMenuProps {
  data: ScheduledVisits;
}

const Home: React.FC = () => {
  const [loadingVisits, setLoadingVisits] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [clientsData, setClientsData] = useState<ScheduledVisits[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const { snackbar } = useDialogAlert();
  const { serviceContainer } = useIoCContext();
  const { userData } = useAuth();
  const { RangePicker } = DatePicker;

  const navigate = useNavigate();
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

  const cleanFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilterStatus("");
  };

  const fetchScheduledVisits = async () => {
    try {
      setLoadingVisits(true);

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
    } finally {
      setLoadingVisits(false);
    }
  };

  const updateStatus = async (id: number) => {
    try {
      await visitsService.cancelVisit(id);
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

  const downloadReport = async () => {
    try {
      setLoadingDownload(true);

      const response = await visitsService.downloadReport(
        userData.usuario_id,
        startDate,
        endDate,
        filterStatus
      );

      const today = moment()
        .format()
        .replace(/[-:]/g, "")
        .replace("T", "")
        .slice(0, 14);

      downloadXLSX(response, today);
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({
          message: `Error: ${error.message}`,
          variant: "error",
        });
      }
    } finally {
      setLoadingDownload(false);
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

    const createMenuItem = (label: string, type: string) => ({ label, type });

    const menuItems = [
      createMenuItem("Editar agendamento", "edit"),
      createMenuItem("Cancelar agendamento", "cancel"),
    ];

    const handleActionMenu = (type: string) => {
      switch (type) {
        case "edit":
          navigate(`${ROUTES.REGISTER().VISIT}?id=${data.cliente_id}`);
          break;
        case "cancel":
          updateStatus(data.cliente_id);
          break;
        default:
          break;
      }
    };

    return (
      <Box>
        <IconButton
          onClick={handleClick}
          disabled={data.status === "cancelado"}
        >
          <MoreVertOutlined />
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {menuItems.map((items, index) => (
            <MenuItem key={index} onClick={() => handleActionMenu(items.type)}>
              {items.label}
            </MenuItem>
          ))}
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

      <Card sx={{ boxShadow: "none", padding: "1.5rem", borderRadius: "8px" }}>
        <Stack direction="row" justifyContent="space-between" flexWrap={"wrap"}>
          <Stack gap={1}>
            <TitleAndSubtitle
              title={`Olá, ${capitalize(userData?.nome)}!`}
              subtitle="Confira sua agenda de visitas marcadas."
            />

            <CustomButton
              title="Baixar relatório"
              variant={
                loadingDownload
                  ? CustomButtonVariant.CONTAINED_LOADING
                  : CustomButtonVariant.CONTAINED_DOWNLOAD
              }
              onClick={() => downloadReport()}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="end"
            flexWrap="wrap-reverse"
            gap={2}
          >
            <Box>
              <CustomButton
                title="Limpar filtros"
                variant={CustomButtonVariant.OUTLINED}
                onClick={() => cleanFilters()}
              />
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
                //@ts-ignore
                value={
                  startDate && endDate
                    ? [
                        moment(startDate, "YYYY-MM-DD"),
                        moment(endDate, "YYYY-MM-DD"),
                      ]
                    : null
                }
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
              value={filterStatus}
              onChange={({ target }) => {
                setFilterStatus(target.value);
              }}
              options={optionsFilterStatus}
            />
          </Stack>
        </Stack>

        <Divider />

        {loadingVisits ? (
          <Stack paddingY="5rem" alignItems="center" gap={2}>
            <CircularProgress sx={{ color: theme.palette.grey[600] }} />
            <Typography
              sx={{ color: theme.palette.grey[700], fontFamily: "Poppins" }}
            >
              Carregando agenda de visitas...
            </Typography>
          </Stack>
        ) : (
          <Fragment>
            {!isDataEmpty ? (
              <TableContainer sx={{ overflowX: "scroll" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {homeHeaderColumns.map((items, index) => (
                        <TableCell
                          key={index}
                          //@ts-ignore
                          sx={{
                            position: index === 0 && "sticky",
                            left: 0,
                            backgroundColor:
                              index === 0 && theme.palette.grey[100],
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

                        <TableCell>
                          <StyledMenu data={items} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <WithoutVisit />
            )}
          </Fragment>
        )}
      </Card>
    </Layout>
  );
};

export default Home;
