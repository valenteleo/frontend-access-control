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
import { useEffect, useState } from "react";
import {
  IRegisterVisit,
  IRegisterVisitService,
} from "../../modules/register/models";
import { useAuth } from "../../contexts/AuthContext";
import { formatQRCodeValue } from "../../utils";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import { IVisitsService } from "../../modules/visits/models";
import { formattedDate } from "../../utils/format";

const LogVisit: React.FC = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    cpf: "",
    date: "",
  });

  const url = useSearchParams();
  const [searchParams] = url;
  const id = searchParams.get("id");
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const { snackbar } = useDialogAlert();
  const { userData } = useAuth();
  const { serviceContainer } = useIoCContext();

  const navigate = useNavigate();
  const theme = useTheme();

  const registerVisitService = serviceContainer.get<IRegisterVisitService>(
    Types.Register.IRegisterVisitService
  );

  const visitService = serviceContainer.get<IVisitsService>(
    Types.Visits.IVisitsService
  );

  const validateLogSchema = Yup.object().shape({
    name: isEdit ? Yup.string() : Yup.string().required("Campo obrigatório"),
    cpf: isEdit ? Yup.string() : Yup.string().required("Campo obrigatório"),
    date: isEdit ? Yup.string() : Yup.string().required("Campo obrigatório"),
  });

  const fetchScheduledById = async () => {
    try {
      const response = await visitService.getScheduledById(Number(id));

      setInitialValues({
        name: response.nome,
        cpf: response.cpf,
        date: formattedDate(response.datavis),
      });
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({
          message: `Error: ${error.message}`,
          variant: "error",
        });
      }
    }
  };

  const registerUser = async (value: typeof initialValues) => {
    try {
      setLoading(true);

      const data: IRegisterVisit = {
        codusuario: userData.usuario_id,
        nome: value.name,
        cpf: value.cpf,
        datavis: value.date,
        codqr: formatQRCodeValue(value.name, value.cpf, value.date),
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

  const changeDateVisit = async (values: typeof initialValues) => {
    try {
      await visitService.updateDateVisit(Number(id), values.date);

      snackbar({
        message: "Data da visita atualizada",
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
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchScheduledById();
    }
  }, []);

  return (
    <Layout>
      <TitleBarPage
        title={`${isEdit ? "Editar" : "Cadastrar"} visita`}
        icon={<CalendarMonthOutlined htmlColor={theme.palette.grey[600]} />}
      />

      <Card
        sx={{
          boxShadow: "none",
          padding: "1rem",
          justifyContent: "space-between",
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
          onSubmit={isEdit ? changeDateVisit : registerUser}
        >
          {(props) => (
            <FormLogVisit
              {...props}
              isSubmitting={loading}
              isEdit={isEdit}
              stateValues={initialValues}
              setStateValues={setInitialValues}
            />
          )}
        </Formik>
      </Card>
    </Layout>
  );
};

export default LogVisit;
