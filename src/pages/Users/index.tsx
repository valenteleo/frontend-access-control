import { useEffect, useState } from "react";
import {
  DeleteOutline,
  GroupOutlined,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";
import Layout from "../../components/Layout";
import TitleBarPage from "../../components/TitleBarPage";
import {
  ButtonBase,
  Card,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import CustomButton from "../../components/CustomButton";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";
import { headersUsers } from "./headers";
import ModalConfirm from "./ModalConfirm";
import { IUserData } from "../../modules/authentication/models";
import DynamicCells from "./DynamicCells";
import ModalChangePass from "./ModalChangePass";
import { AppError } from "../../utils/AppError";
import useDialogAlert from "../../hooks/useDialogAlert";
import { ArrayIsEmpty } from "../../utils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { IUsersService } from "../../modules/users/models";

export const example = [
  { nome: "Kleberson", perfil: 0, login: "kf@teste.com", usuario_id: 1 },
  { nome: "Leonardo", perfil: 0, login: "leo@teste.com", usuario_id: 2 },
];

export type UserType = Pick<IUserData, "usuario_id" | "nome">;

const Users: React.FC = () => {
  const [usersInfo, setUsersInfo] = useState<Partial<IUserData>[]>([]);

  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [showChangePass, setShowChangePass] = useState<boolean>(false);

  const [user, setUser] = useState<UserType>({} as UserType);

  const theme = useTheme();
  const navigate = useNavigate();

  const { serviceContainer } = useIoCContext();
  const { snackbar } = useDialogAlert();

  const usersService = serviceContainer.get<IUsersService>(
    Types.Users.IUsersService
  );

  const isEmpty = ArrayIsEmpty(usersInfo);

  const handleModal = (isDelete: boolean, name: string, idx: number) => {
    setUser((prevState) => ({
      ...prevState,
      nome: name,
      usuario_id: idx,
    }));

    const modal = isDelete ? setShowModalConfirm : setShowChangePass;
    modal(true);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await usersService.getAllUsers();

      setUsersInfo(response.Users);
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({ message: `Error: ${error.message}`, variant: "error" });
      }
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Layout>
      {showModalConfirm && (
        <ModalConfirm
          open={showModalConfirm}
          handleClose={() => setShowModalConfirm(false)}
          user={user}
          onReload={fetchAllUsers}
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
        {isEmpty ? (
          <Stack gap={2}>
            <Typography sx={{ color: theme.palette.grey[700] }}>
              Parece que ainda não há usuários cadastrados...
            </Typography>

            <ButtonBase
              sx={{
                padding: ".5rem",
                display: "flex",
                gap: "1rem",
              }}
              onClick={() => navigate(ROUTES.REGISTER().USER)}
            >
              <PersonAddAlt1Outlined htmlColor={theme.palette.grey[700]} />
              <Typography sx={{ color: theme.palette.grey[700] }}>
                Clique aqui e vá para o cadastro de usuário
              </Typography>
            </ButtonBase>
          </Stack>
        ) : (
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
                        onClick={() =>
                          handleModal(
                            false,
                            String(items.nome),
                            Number(items.usuario_id)
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleModal(
                            true,
                            String(items.nome),
                            Number(items.usuario_id)
                          )
                        }
                      >
                        <DeleteOutline />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Layout>
  );
};

export default Users;
