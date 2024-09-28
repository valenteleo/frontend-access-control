import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import FormRegister from "./FormRegister";
import Layout from "../../components/Layout";
import { Card, Theme, useTheme } from "@mui/material";
import TitleBarPage from "../../components/TitleBarPage";
import { HowToRegOutlined } from "@mui/icons-material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import { AppError } from "../../utils/AppError";
import useDialogAlert from "../../hooks/useDialogAlert";

const useStyles = (theme: Theme) => {
  return {
    card: {
      borderRadius: "4px",
      boxShadow: "none",
      padding: "1rem",
      border: `2px dashed ${theme.palette.grey[300]}`,
    },
  };
};

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { snackbar } = useDialogAlert();

  const theme = useTheme();
  const styles = useStyles(theme);

  const initialValues = {
    email: "",
    password: "",
    name: "",
    profile: "",
  };

  const validateRegisterSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
    profile: Yup.string().required("Campo obrigatório"),
  });

  const signUp = async (values: typeof initialValues) => {
    try {
      setLoading(true);
      const parseData = {
        login: values.email,
        nome: values.name,
        senha: values.password,
        perfil: values.profile,
      };

      console.log(parseData);
      snackbar({
        message: "Usuário cadastrado com sucesso!",
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({ message: `Error: ${error.message}`, variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <TitleBarPage
        title="Cadastrar usuário"
        icon={<HowToRegOutlined htmlColor={theme.palette.grey[600]} />}
      />
      <Card sx={styles.card}>
        <TitleAndSubtitle
          title="Insira as informações do usuário."
          sx={{ marginBottom: "2rem" }}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validateRegisterSchema}
          onSubmit={(value) => signUp(value)}
        >
          {(props) => <FormRegister {...props} isSubmitting={loading} />}
        </Formik>
      </Card>
    </Layout>
  );
};

export default Register;
