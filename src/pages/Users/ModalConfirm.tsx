import { Card, Divider, Modal, useTheme } from "@mui/material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import CustomButton from "../../components/CustomButton";
import { ReportProblemOutlined } from "@mui/icons-material";
import { useState } from "react";
import useDialogAlert from "../../hooks/useDialogAlert";
import { AppError } from "../../utils/AppError";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { IUsersService } from "../../modules/users/models";
import { UserType } from ".";
import { capitalize } from "../../utils/format";

interface IModalConfirmProps {
  open: boolean;
  user: UserType;
  handleClose: () => void;
  onReload: () => void;
}

const useStyles = () => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    boxShadow: "none",
    py: "1rem",
    px: "1.5rem",
  },
  alert: { alignSelf: "center", height: "7rem", width: "5rem" },
});

const ModalConfirm: React.FC<IModalConfirmProps> = ({
  open,
  handleClose,
  onReload,
  ...props
}) => {
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const { serviceContainer } = useIoCContext();

  const { snackbar } = useDialogAlert();

  const usersService = serviceContainer.get<IUsersService>(
    Types.Users.IUsersService
  );

  const theme = useTheme();
  const styles = useStyles();

  const deleteUser = async () => {
    try {
      setLoadingDelete(true);

      await usersService.deleteUser(props.user.usuario_id);

      snackbar({ message: "Usuário deletado com sucesso", variant: "success" });

      onReload();
      handleClose();
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({ message: `Error: ${error.message}`, variant: "error" });
      }
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} sx={styles.modal}>
      <Card sx={styles.card}>
        <TitleAndSubtitle
          title={`Deseja excluir o usuário ${capitalize(props.user.nome)}?`}
          subtitle="Após a confirmação, a operação não poderá ser desfeita."
        />

        <ReportProblemOutlined
          htmlColor={theme.palette.error.dark}
          sx={styles.alert}
        />

        <Divider sx={{ mx: "-2rem" }} />

        <CustomButton
          title="Confirmar"
          sx={{ alignSelf: "flex-end" }}
          onClick={deleteUser}
          variant={
            loadingDelete
              ? CustomButtonVariant.CONTAINED_LOADING
              : CustomButtonVariant.CONTAINED
          }
        />
      </Card>
    </Modal>
  );
};

export default ModalConfirm;
