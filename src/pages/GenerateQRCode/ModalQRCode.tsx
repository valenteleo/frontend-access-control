import { useRef } from "react";
import { CloseOutlined } from "@mui/icons-material";
import {
  Card,
  IconButton,
  Modal,
  Stack,
  Typography,
  useTheme,
  Theme,
  Tooltip,
} from "@mui/material";
import QRCode from "react-qr-code";
import CustomButton from "../../components/CustomButton";
import { downloadSVG } from "../../utils/download";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";

const useStyles = (theme: Theme) => ({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: ".5rem 2rem 1.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
  containerQRCode: {
    background: "#FFF",
    borderRadius: "4px",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ".5rem",
    width: "100%",
  },
  titleContainer: {
    maxWidth: "13rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontSize: ".8rem",
    fontFamily: "Poppins",
    color: theme.palette.grey[700],
    fontWeight: "600",
  },
});
interface ModalQRCodeProps {
  open: boolean;
  value: string;
  onClose: () => void;
}

const ModalQRCode: React.FC<ModalQRCodeProps> = ({
  open,
  value,
  onClose,
}: ModalQRCodeProps) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const qrRef = useRef<HTMLDivElement | null>(null);

  return (
    <Modal open={open}>
      <Stack sx={styles.container}>
        <Card sx={styles.card}>
          <Stack sx={styles.topContainer}>
            <Tooltip title={value} placement="top" arrow>
              <Typography sx={styles.titleContainer}>{value}</Typography>
            </Tooltip>

            <IconButton>
              <CloseOutlined onClick={onClose} />
            </IconButton>
          </Stack>

          <div ref={qrRef}>
            <QRCode style={styles.containerQRCode} value={value} />
          </div>

          <CustomButton
            title="Baixar QR Code"
            variant={CustomButtonVariant.CONTAINED_DOWNLOAD}
            onClick={() => downloadSVG(qrRef, value)}
          />
        </Card>
      </Stack>
    </Modal>
  );
};

export default ModalQRCode;
