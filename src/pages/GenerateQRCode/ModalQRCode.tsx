import { CloseOutlined } from "@mui/icons-material";
import { Card, IconButton, Modal, Stack, Typography } from "@mui/material";
import QRCode from "react-qr-code";

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
  return (
    <Modal open={open}>
      <Stack
        sx={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ padding: ".5rem 1.5rem 1.5rem 1.5rem" }}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: ".5rem",
            }}
          >
            <IconButton>
              <CloseOutlined onClick={onClose} />
            </IconButton>
          </Stack>

          <QRCode
            style={{
              background: "#FFF",
              padding: ".5rem",
              border: "1px solid",
              borderRadius: "4px",
            }}
            value={value}
          />

          <Typography
            sx={{ marginTop: "1rem", width: "100%", textAlign: "center" }}
          >
            {value}
          </Typography>
        </Card>
      </Stack>
    </Modal>
  );
};

export default ModalQRCode;
