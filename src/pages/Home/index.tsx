import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { formatQRCodeValue } from "../../utils";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { IQRCodeService } from "../../modules/qrcode/models/IQRCodeService";
import { AppError } from "../../utils/AppError";
import QRCode from "react-qr-code";

const Home: React.FC = () => {
  const [hasQRCode, setHasQRCode] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState("");

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
        console.log(error.message);
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
        {({ handleChange, handleSubmit, handleBlur, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Stack direction="column" gap="2rem">
              <Stack direction="column">
                <TextField
                  name="name"
                  label="Nome"
                  type="text"
                  placeholder="Insira"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && (
                  <span style={{ color: "#CC3D3D" }}>{errors.name}</span>
                )}
              </Stack>

              <Stack direction="column">
                <TextField
                  name="employee"
                  label="Matrícula"
                  type="text"
                  placeholder="Insira"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.employee}
                />
                {errors.employee && (
                  <span style={{ color: "#CC3D3D" }}>{errors.employee}</span>
                )}
              </Stack>

              <Button
                type="submit"
                variant="contained"
                disabled={!Object.values(values).every(Boolean)}
                sx={{ backgroundColor: "#58595B" }}
              >
                Gerar QRCode
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      {hasQRCode && <QRCode value={qrCodeValue} />}
    </Stack>
  );
};

export default Home;
