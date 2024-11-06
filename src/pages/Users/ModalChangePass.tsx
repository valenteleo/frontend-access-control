import { Card, Divider, Modal, TextField } from "@mui/material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import useDialogAlert from "../../hooks/useDialogAlert";
import { AppError } from "../../utils/AppError";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { IUsersService } from "../../modules/users/models";
import { UserType } from ".";
import { capitalize } from "../../utils/format";

interface IModalChangePassProps {
  open: boolean;
  onClose: () => void;
  user: UserType;
}

const useSyles = () => ({
  modal: { display: "flex", justifyContent: "center", alignItems: "center" },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "25rem",
    gap: 2,
    py: 2,
    px: 3,
  },
});

const ModalChangePass: React.FC<IModalChangePassProps> = ({
  open,
  onClose,
  ...props
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [loadingChangePass, setLoadingChangePass] = useState<boolean>(false);

  const { serviceContainer } = useIoCContext();

  const { snackbar } = useDialogAlert();

  const usersService = serviceContainer.get<IUsersService>(
    Types.Users.IUsersService
  );

  const handleChangePass = async () => {
    try {
      setLoadingChangePass(true);

      await usersService.changePassword(props.user.usuario_id, newPassword);

      snackbar({ message: "Senha alterada com sucesso", variant: "success" });

      onClose();
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({ message: `Error: ${error.message}`, variant: "error" });
      }
    } finally {
      setLoadingChangePass(false);
    }
  };

  const styles = useSyles();
  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Card sx={styles.card}>
        <TitleAndSubtitle
          title={`Alterar senha de ${capitalize(props.user.nome)}`}
          subtitle="É obrigatório preencher o campo abaixo para concluir a troca."
        />

        <TextField
          type="text"
          size="small"
          placeholder="Nova senha"
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
        />

        <Divider sx={{ mx: "-2rem" }} />

        <CustomButton
          title="Salvar"
          sx={{ alignSelf: "flex-end" }}
          onClick={handleChangePass}
          variant={
            !newPassword
              ? CustomButtonVariant.DISABLED
              : loadingChangePass
              ? CustomButtonVariant.CONTAINED_LOADING
              : CustomButtonVariant.CONTAINED
          }
        />
      </Card>
    </Modal>
  );
};

export default ModalChangePass;
