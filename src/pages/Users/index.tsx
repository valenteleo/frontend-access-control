import { useState } from "react";
import { DeleteOutline, GroupOutlined } from "@mui/icons-material";
import Layout from "../../components/Layout";
import TitleBarPage from "../../components/TitleBarPage";
import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import CustomButton from "../../components/CustomButton";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";
import { headersUsers } from "./headers";
import ModalConfirm from "./ModalConfirm";
import { IUserData } from "../../modules/authentication/models";
import DynamicCells from "./DynamicCells";
import ModalChangePass from "./ModalChangePass";

const Users: React.FC = () => {
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [showChangePass, setShowChangePass] = useState<boolean>(false);

  const [user, setUser] = useState<string>("");

  const theme = useTheme();

  const usersInfo: Partial<IUserData>[] = [
    { nome: "Leonardo", perfil: 0, login: "leo@teste.com" },
    { nome: "Kleberson", perfil: 0, login: "kf@teste.com" },
  ];

  const handleModalDelete = (user: string) => {
    setUser(user);
    setShowModalConfirm(true);
  };

  return (
    <Layout>
      {showModalConfirm && (
        <ModalConfirm
          open={showModalConfirm}
          handleClose={() => setShowModalConfirm(false)}
          user={user}
        />
      )}

      {showChangePass && (
        <ModalChangePass
          open={showChangePass}
          onClose={() => setShowChangePass(false)}
          user={user}
        />
      )}

      <TitleBarPage
        title="Usuários"
        icon={<GroupOutlined htmlColor={theme.palette.grey[600]} />}
      />

      <Card sx={{ boxShadow: "none", p: "1rem" }}>
        <TableContainer sx={{ overflowX: "scroll" }}>
          <Table>
            <TableHead>
              {headersUsers.map((items, index) => (
                <TableCell
                  key={index}
                  //@ts-ignore
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.grey[700],
                    position: index === 0 && "sticky",
                    left: 0,
                    backgroundColor:
                      index === 0 && theme.palette.background.default,
                  }}
                >
                  {items.label}
                </TableCell>
              ))}
            </TableHead>

            <TableBody>
              {usersInfo.map((items, index) => (
                <TableRow key={index}>
                  <DynamicCells
                    info={{
                      nome: items.nome as string,
                      perfil: items.perfil!,
                      login: items.login as string,
                    }}
                  />

                  <TableCell>
                    <CustomButton
                      title="Alterar"
                      variant={CustomButtonVariant.OUTLINED}
                      onClick={() => {
                        setUser(items.nome as string), setShowChangePass(true);
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => handleModalDelete(items.nome as string)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Layout>
  );
};

export default Users;
