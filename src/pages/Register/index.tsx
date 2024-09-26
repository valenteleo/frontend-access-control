import { Box, Stack, Typography } from "@mui/material";
import backgroundPNG from "../../../public/images/background.jpg";
import { Formik } from "formik";
import * as Yup from "yup";
import FormRegister from "./FormRegister";
import { useState } from "react";
import CardLogin from "../../components/CardLogin";

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validateRegisterSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Box
      sx={{ backgroundImage: `url(${backgroundPNG})`, backgroundSize: "cover" }}
    >
      <Stack sx={{ height: "100vh" }}>
        <CardLogin
          title="Cadastre-se aqui"
          children={
            <Formik
              initialValues={initialValues}
              validationSchema={validateRegisterSchema}
              onSubmit={(value) => alert(JSON.stringify(value, null, 2))}
            >
              {(props) => <FormRegister {...props} isSubmitting={loading} />}
            </Formik>
          }
          content={
            <Typography
              sx={{
                fontSize: 12,
                color: "#58595B",
                textAlign: "center",
              }}
            >
              Serviço de confirmação de atendimento.
            </Typography>
          }
        />
      </Stack>
    </Box>
  );
};

export default Register;
