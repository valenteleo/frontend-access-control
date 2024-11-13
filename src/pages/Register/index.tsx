import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import FormRegister from "./FormRegister";
import Layout from "../../components/Layout";
import { Card, useTheme } from "@mui/material";
import TitleBarPage from "../../components/TitleBarPage";
import { PersonAddAltOutlined } from "@mui/icons-material";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import { AppError } from "../../utils/AppError";
import useDialogAlert from "../../hooks/useDialogAlert";
import { useIoCContext } from "../../contexts/IoCContext";
import { IRegisterVisitService } from "../../modules/register/models";
import { Types } from "../../ioc/types";
import { ROUTES } from "../../appConfig/routes";
import { useNavigate } from "react-router-dom";

const useStyles = () => {
  return {
    card: {
      borderRadius: "4px",
      boxShadow: "none",
      padding: "1rem",
    },
  };
};

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { serviceContainer } = useIoCContext();
  const { snackbar } = useDialogAlert();

  const theme = useTheme();
  const styles = useStyles();
  const navigate = useNavigate();

  const registerService = serviceContainer.get<IRegisterVisitService>(
    Types.Register.IRegisterVisitService
  );

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
        perfil: Number(values.profile),
      };

      await registerService.registerUser(parseData);

      snackbar({
        message: "Usuário cadastrado com sucesso!",
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });

      navigate(ROUTES.USERS);
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
        icon={<PersonAddAltOutlined htmlColor={theme.palette.grey[600]} />}
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
