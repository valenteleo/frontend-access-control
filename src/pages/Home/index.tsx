import { useState } from "react";
import { Stack } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { formatQRCodeValue } from "../../utils";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { IQRCodeService } from "../../modules/qrcode/models/IQRCodeService";
import { AppError } from "../../utils/AppError";
import QRCode from "react-qr-code";
import { FormQRCode } from "./FormQRCode";
import useDialogAlert from "../../hooks/useDialogAlert";

const Home: React.FC = () => {
  const [hasQRCode, setHasQRCode] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState("");

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
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "2rem",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => generateQRCode(values.name, values.employee)}
      >
        {(props) => <FormQRCode {...props} />}
      </Formik>
      {hasQRCode && <QRCode value={qrCodeValue} />}
    </Stack>
  );
};

export default Home;
