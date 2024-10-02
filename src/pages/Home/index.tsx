import { useState } from "react";
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

export interface IMock {
  name: string;
  cpf: string;
  date: string;
  status: string;
}

interface StyledMenuProps {
  data: IMock;
}

const Home: React.FC = () => {
  const theme = useTheme();

  const { RangePicker } = DatePicker;

  const mock: IMock[] = [
    // {
    //   name: "Arthur Morgan",
    //   cpf: "123.456.789-10",
    //   date: "10/10/2024",
    //   status: "Agendado",
    // },
  ];

  const isDataEmpty = ArrayIsEmpty(mock);

  const optionsFilterStatus = [
    { value: "agendado", label: "Agendado" },
    { value: "compareceu", label: "Compareceu" },
    { value: "nao compareceu", label: "Não compareceu" },
    { value: "cancelado", label: "Cancelado" },
  ];

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
      alert(data.name);
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
        </Menu>
      </Box>
    );
  };

  return (
    <Layout>
      <TitleBarPage
        title="Visitas agendadas"
        icon={<HomeOutlined htmlColor={theme.palette.grey[600]} />}
      />

      <Card>
        <Stack direction="row" justifyContent="space-between">
          <TitleAndSubtitle
            title="Olá, Leonardo!"
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
                    console.log(
                      startDate?.format("YYYY-MM-DD"),
                      endDate?.format("YYYY-MM-DD")
                    );
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
                onChange={(event) => {
                  console.log(event.target.value);
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
                    align={index === 3 ? "center" : "left"}
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
              {mock.map((items, index) => (
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
