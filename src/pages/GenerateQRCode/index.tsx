import { useState } from "react";
import { Card, Stack, Theme, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormQRCode } from "./FormQRCode";
import Layout from "../../components/Layout";
import { ListAltOutlined, QrCodeOutlined } from "@mui/icons-material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import TitleBarPage from "../../components/TitleBarPage";
import ModalQRCode from "./ModalQRCode";
import { formatQRCodeValue } from "../../utils";

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

const GenerateQRCode: React.FC = () => {
  const [hasQRCode, setHasQRCode] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState("");

  const theme = useTheme();
  const styles = useStyles(theme);

  const initialValues = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
  });

  const generateQRCode = (name: string) => {
    const formattedName = formatQRCodeValue(name);

    setHasQRCode(true);
    setQRCodeValue(formattedName);
  };

  return (
    <Layout>
      {hasQRCode && (
        <ModalQRCode
          open={hasQRCode}
          value={qrCodeValue}
          onClose={() => setHasQRCode(false)}
        />
      )}
      <TitleBarPage
        title="Gerar QR Code"
        icon={<QrCodeOutlined htmlColor={theme.palette.grey[600]} />}
      />
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
            onSubmit={(values) => generateQRCode(values.name)}
          >
            {(props) => <FormQRCode {...props} />}
          </Formik>
        </Card>
      </Stack>
    </Layout>
  );
};

export default GenerateQRCode;
