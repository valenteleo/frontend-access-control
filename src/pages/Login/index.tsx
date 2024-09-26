import { Fragment, useState } from "react";
import {
  Box,
  ButtonBase,
  Stack,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import backgroundPNG from "../../../public/images/background.jpg";
import FormLogin from "./FormLogin";
import { Formik } from "formik";
import * as Yup from "yup";
import useDialogAlert from "../../hooks/useDialogAlert";
import { AppError } from "../../utils/AppError";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import CardLogin from "../../components/CardLogin";

const useStyles = (theme: Theme) => {
  return {
    title: {
      color: theme.palette.grey[700],
    },
    loginFormField: {
      height: "100vh",
    },
    background: {
      backgroundImage: `url(${backgroundPNG})`,
      backgroundSize: "cover",
    },
  };
};

const Login: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { snackbar } = useDialogAlert();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationLoginSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
  });

  const signIn = () => {
    try {
      setLoading(true);
      snackbar({
        message: "Login efetuado com sucesso!",
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error) {
      if (error instanceof AppError) {
        snackbar({
          message: error.message,
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.background}>
      <Stack sx={styles.loginFormField}>
        <CardLogin
          title="Faça seu login"
          children={
            <Formik
              initialValues={initialValues}
              validationSchema={validationLoginSchema}
              onSubmit={signIn}
            >
              {(props) => <FormLogin {...props} isSubmitting={loading} />}
            </Formik>
          }
          content={
            <Fragment>
              <ButtonBase onClick={() => navigate(ROUTES.REGISTER)}>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: theme.palette.info.dark,
                    textDecoration: "underline",
                  }}
                >
                  Ainda não possui cadastro? Clique aqui
                </Typography>
              </ButtonBase>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#58595B",
                  textAlign: "center",
                }}
              >
                Serviço de confirmação de atendimento.
              </Typography>
            </Fragment>
          }
        />
      </Stack>
    </Box>
  );
};

export default Login;
