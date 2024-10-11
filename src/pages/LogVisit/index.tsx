import { Card, useTheme } from "@mui/material";
import Layout from "../../components/Layout";
import TitleBarPage from "../../components/TitleBarPage";
import { CalendarMonthOutlined } from "@mui/icons-material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import { Formik } from "formik";
import * as Yup from "yup";
import FormLogVisit from "./FormLogVisit";
import useDialogAlert from "../../hooks/useDialogAlert";
import { AppError } from "../../utils/AppError";
import { useState } from "react";
import {
  IRegisterVisit,
  IRegisterVisitService,
} from "../../modules/register/models";
import { useAuth } from "../../contexts/AuthContext";
import { formatQRCodeValue } from "../../utils";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";

const LogVisit: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { snackbar } = useDialogAlert();
  const { userData } = useAuth();
  const { serviceContainer } = useIoCContext();

  const navigate = useNavigate();
  const theme = useTheme();

  const registerVisitService = serviceContainer.get<IRegisterVisitService>(
    Types.Register.IRegisterVisitService
  );

  const initialValues = {
    name: "",
    cpf: "",
    date: "",
  };

  const validateLogSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    date: Yup.string().required("Campo obrigatório"),
  });

  const registerUser = async (value: typeof initialValues) => {
    try {
      setLoading(true);

      const data: IRegisterVisit = {
        codusuario: userData.usuario_id,
        nome: value.name,
        cpf: value.cpf,
        datavis: value.date,
        codqr: formatQRCodeValue(value.name, value.date),
      };

      await registerVisitService.registerVisit(data);

      snackbar({
        message: "Visita cadastrada com sucesso!",
        variant: "success",
      });

      navigate(ROUTES.HOME);
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({
          message: `Error: ${error.message}`,
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <TitleBarPage
        title="Cadastrar visita"
        icon={<CalendarMonthOutlined htmlColor={theme.palette.grey[600]} />}
      />

      <Card
        sx={{
          boxShadow: "none",
          padding: "1rem",
          justifyContent: "space-between",
          border: `2px dashed ${theme.palette.grey[300]}`,
        }}
      >
        <TitleAndSubtitle
          title="Preencha os dados corretamente"
          subtitle="Atenção! As informações abaixo não poderão ser alteradas após salvas."
          marginBottom="1rem"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validateLogSchema}
          onSubmit={registerUser}
        >
          {(props) => <FormLogVisit {...props} isSubmitting={loading} />}
        </Formik>
      </Card>
    </Layout>
  );
};

export default LogVisit;
