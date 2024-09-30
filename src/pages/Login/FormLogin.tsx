import { useState } from "react";
import {
  Box,
  Checkbox,
  Divider,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Form, FormikProps } from "formik";
import CustomButton from "../../components/CustomButton";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";

interface IFormValues {
  email: string;
  password: string;
}

interface FormLoginProps extends FormikProps<IFormValues> {
  isSubmitting: boolean;
}

const FormLogin: React.FC<FormLoginProps> = ({
  isSubmitting,
  ...props
}: FormLoginProps) => {
  const [showPass, setShowPass] = useState(false);

  const theme = useTheme();

  const HelperText = styled(Typography)(({ theme }) => ({
    fontFamily: "Poppins",
    fontSize: 12,
    color: theme.palette.error.dark,
    paddingLeft: ".5rem",
  }));

  return (
    <Form onSubmit={props.handleSubmit}>
      <Stack style={{ gap: "2rem" }}>
        <Box>
          <TextField
            fullWidth
            size="small"
            name="email"
            type="text"
            label="E-mail"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          {props.errors.email && props.touched.email && (
            <HelperText>{props.errors.email}</HelperText>
          )}
        </Box>

        <Box>
          <TextField
            fullWidth
            size="small"
            name="password"
            type={showPass ? "text" : "password"}
            label="Senha"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />

          <Stack direction="row" alignItems="center">
            <Checkbox
              size="small"
              sx={{
                color: theme.palette.grey[700],
                "&.Mui-checked": { color: theme.palette.grey[700] },
              }}
              checked={showPass}
              onChange={() => setShowPass(!showPass)}
            />
            <Typography
              sx={{
                fontSize: 12,
                color: theme.palette.grey[700],
                fontFamily: "Poppins",
              }}
            >
              Mostrar senha
            </Typography>
          </Stack>
          {props.errors.password && props.touched.password && (
            <HelperText>{props.errors.password}</HelperText>
          )}
        </Box>

        <Divider />

        <CustomButton
          title="Fazer login"
          onClick={() => props.handleSubmit()}
          variant={
            isSubmitting
              ? CustomButtonVariant.CONTAINED_LOADING
              : CustomButtonVariant.CONTAINED
          }
        />
      </Stack>
    </Form>
  );
};

export default FormLogin;
