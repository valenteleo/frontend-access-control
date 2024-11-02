import { Fragment, useEffect, useState } from "react";
import { Box, Stack, Theme, Typography, useTheme } from "@mui/material";
import backgroundPNG from "../../../public/images/background.jpg";
import FormLogin from "./FormLogin";
import { Formik } from "formik";
import * as Yup from "yup";
import useDialogAlert from "../../hooks/useDialogAlert";
import { AppError } from "../../utils/AppError";
import CardLogin from "../../components/CardLogin";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import { useIoCContext } from "../../contexts/IoCContext";
import { Types } from "../../ioc/types";
import { IAuthenticationService } from "../../modules/authentication/models";
import { useAuth } from "../../contexts/AuthContext";

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
  const [loading, setLoading] = useState(false);

  const { serviceContainer } = useIoCContext();
  const { userData, setIsAuthenticated, setUserData, redirectByLogout } =
    useAuth();
  const { snackbar } = useDialogAlert();

  const navigate = useNavigate();
  const theme = useTheme();
  const styles = useStyles(theme);

  const autheticationService = serviceContainer.get<IAuthenticationService>(
    Types.Authentication.IAuthenticationService
  );

  const initialValues = {
    email: "",
    password: "",
  };

  const validationLoginSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
  });

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await autheticationService.signIn(email, password);

      snackbar({
        message: "Login efetuado com sucesso!",
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      setTimeout(() => {
        setUserData(response);

        if (Object.keys(userData)) {
          setIsAuthenticated(true);
          navigate(ROUTES.HOME);
        }
      }, 1000);
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

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        const isAuthenticated = await autheticationService.getUserData();

        if (isAuthenticated) {
          setIsAuthenticated(true);
          setUserData(isAuthenticated);
          navigate(ROUTES.HOME);
        }

        snackbar({
          message: "Bem-vindo(a) novamente",
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (!redirectByLogout) {
      handleAuthentication();
    }
  }, []);

  return (
    <Box sx={styles.background}>
      <Stack sx={styles.loginFormField}>
        <CardLogin
          title="Faça seu login"
          children={
            <Formik
              initialValues={initialValues}
              validationSchema={validationLoginSchema}
              onSubmit={(value) => signIn(value.email, value.password)}
            >
              {(props) => <FormLogin {...props} isSubmitting={loading} />}
            </Formik>
          }
          content={
            <Fragment>
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
