import { Card, Divider, Modal, TextField } from "@mui/material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import useDialogAlert from "../../hooks/useDialogAlert";
import { AppError } from "../../utils/AppError";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";

interface IModalChangePassProps {
  open: boolean;
  onClose: () => void;
  user: string;
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

  const { snackbar } = useDialogAlert();

  const handleChangePass = async () => {
    try {
      setLoadingChangePass(true);

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
          title={`Alterar senha de ${props.user}`}
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
