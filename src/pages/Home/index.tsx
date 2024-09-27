import { useState } from "react";
import { Card, Stack, Theme, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { formatQRCodeValue } from "../../utils";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { IQRCodeService } from "../../modules/qrcode/models/IQRCodeService";
import { AppError } from "../../utils/AppError";
import { FormQRCode } from "./FormQRCode";
import useDialogAlert from "../../hooks/useDialogAlert";
import Layout from "../../components/Layout";
import { ListAltOutlined } from "@mui/icons-material";
import QRCode from "react-qr-code";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";

const useStyles = (theme: Theme) => {
  return {
    card: {
      borderRadius: "4px",
      boxShadow: "none",
      padding: "1rem",
      border: `2px dashed ${theme.palette.grey[300]}`,
    },
    contentCard: {
      marginBottom: "1.5rem",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  };
};

const Home: React.FC = () => {
  const [hasQRCode, setHasQRCode] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState("");

  const theme = useTheme();
  const styles = useStyles(theme);

  const { snackbar } = useDialogAlert();

  const { serviceContainer } = useIoCContext();

  const qrcodeService = serviceContainer.get<IQRCodeService>(
    Types.QRCode.IQRCodeService
  );

  const initialValues = {
    name: "",
    employee: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    employee: Yup.string().required("Campo obrigatório"),
  });

  const generateQRCode = async (name: string, employee: string) => {
    try {
      const formatValue = formatQRCodeValue(name, employee);
      const data = { qrcode: formatValue };

      await qrcodeService.generateQRCode(data);

      setQRCodeValue(formatValue);
      setHasQRCode(true);
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({ message: error.message, variant: "error" });
      }
    }
  };

  return (
    <Layout>
      <Stack gap={2}>
        <Card sx={styles.card}>
          <Stack sx={styles.contentCard}>
            <TitleAndSubtitle
              title="Insira as informações do visitante."
              subtitle="As informações abaixo são obrigatórias para gerar o QR Code."
            />

            <ListAltOutlined htmlColor={theme.palette.grey[500]} />
          </Stack>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => generateQRCode(values.name, values.employee)}
          >
            {(props) => <FormQRCode {...props} />}
          </Formik>
        </Card>

        {hasQRCode && (
          <QRCode style={{ alignSelf: "center" }} value={qrCodeValue} />
        )}
      </Stack>
    </Layout>
  );
};

export default Home;
