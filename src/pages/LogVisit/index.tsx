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

const LogVisit: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const { snackbar } = useDialogAlert();

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
      snackbar({
        message: "Visita cadastrada com sucesso!",
        variant: "success",
      });

      console.log(value);
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({
          message: `Error: ${error.message}`,
          variant: "success",
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