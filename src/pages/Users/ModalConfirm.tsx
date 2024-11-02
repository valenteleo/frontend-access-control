import { Card, Divider, Modal, useTheme } from "@mui/material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import CustomButton from "../../components/CustomButton";
import { ReportProblemOutlined } from "@mui/icons-material";
import { useState } from "react";
import useDialogAlert from "../../hooks/useDialogAlert";
import { AppError } from "../../utils/AppError";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";

interface IModalConfirmProps {
  open: boolean;
  handleClose: () => void;
  user?: string;
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
  ...props
}) => {
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const { snackbar } = useDialogAlert();

  const theme = useTheme();
  const styles = useStyles();

  const deleteUser = async () => {
    try {
      setLoadingDelete(true);

      snackbar({ message: "Usuário deletado com sucesso", variant: "success" });

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
          title={`Deseja excluir o usuário ${props.user}?`}
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
