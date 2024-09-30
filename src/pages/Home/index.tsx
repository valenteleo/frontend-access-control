import { useState } from "react";
import { Card, Divider } from "antd";
import Layout from "../../components/Layout";
import TitleBarPage from "../../components/TitleBarPage";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { homeHeaderColumns } from "./HomeHeaderColumns";
import { HomeOutlined, MoreVertOutlined } from "@mui/icons-material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import DynamicCells from "./DynamicCells";

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

  const mock: IMock[] = [
    {
      name: "Arthur Morgan",
      cpf: "123.456.789-00",
      date: "30/09/2024",
      status: "Agendado",
    },
    {
      name: "John Marston",
      cpf: "123.456.789-00",
      date: "30/09/2024",
      status: "Compareceu",
    },
    {
      name: "Dutch Van Der Linde",
      cpf: "123.456.789-00",
      date: "30/09/2024",
      status: "Não compareceu",
    },
    {
      name: "Uncle",
      cpf: "123.456.789-00",
      date: "30/09/2024",
      status: "Cancelado",
    },
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
          <MenuItem onClick={handleAlert}>Editar agendamento</MenuItem>
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
        <TitleAndSubtitle
          title="Olá, Leonardo!"
          subtitle="Confira sua agenda de visitas marcadas."
        />

        <Divider />

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
      </Card>
    </Layout>
  );
};

export default Home;
