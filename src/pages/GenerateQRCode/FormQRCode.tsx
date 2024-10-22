import { Stack, Typography, Divider, styled } from "@mui/material";
import { Form, FormikProps } from "formik";
import CustomButton from "../../components/CustomButton";
import SelectCustom from "../../components/SelectCustom";
import { useState, useEffect } from "react";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { IQRCodeService } from "../../modules/qrcode/models/IQRCodeService";
import useDialogAlert from "../../hooks/useDialogAlert";
import { useAuth } from "../../contexts/AuthContext";
import { ProfilesDescription } from "../../components/Routes/RouteGuard";

interface IFormValues {
  name: string;
}

const FormQRCode: React.FC<FormikProps<IFormValues>> = ({
  ...props
}: FormikProps<IFormValues>) => {
  const [qrCodes, setQRCodes] = useState<
    { label: string; value: string | number }[]
  >([]);

  const { serviceContainer } = useIoCContext();
  const { snackbar } = useDialogAlert();
  const { userData } = useAuth();

  const qrcodeService = serviceContainer.get<IQRCodeService>(
    Types.QRCode.IQRCodeService
  );

  const fetchAllQRCode = async () => {
    try {
      const isAdmin =
        userData.perfil === ProfilesDescription.Admin
          ? ""
          : userData.usuario_id;

      const response = await qrcodeService.getListQRCode(isAdmin);

      const data = response.clientes.map((items) => {
        return {
          label: items.nome,
          value: items.codqr,
        };
      });

      setQRCodes(data);
    } catch (error) {
      snackbar({
        message: "Erro ao buscar os QR Codes",
        variant: "error",
      });
    }
  };

  const HelperText = styled(Typography)(({ theme }) => ({
    fontFamily: "Poppins",
    fontSize: 12,
    color: theme.palette.error.dark,
    paddingLeft: ".5rem",
  }));

  useEffect(() => {
    fetchAllQRCode();
  }, []);

  return (
    <Form onSubmit={props.handleSubmit}>
      <Stack direction="column" gap="2rem">
        <Stack direction="column">
          <SelectCustom
            label="Lista de QRCode para visita"
            name="name"
            options={qrCodes}
            onChange={props.handleChange}
          />
          {props.errors.name && <HelperText>{props.errors.name}</HelperText>}
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="flex-end">
          <CustomButton title="Gerar" type="submit" />
        </Stack>
      </Stack>
    </Form>
  );
};

export { FormQRCode };
