import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProps } from "formik";

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
            <Typography color="error" fontSize={12} paddingLeft=".5rem">
              {props.errors.email}
            </Typography>
          )}
        </Box>

        <Box>
          <TextField
            fullWidth
            size="small"
            name="password"
            type="password"
            label="Senha"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
          />
          {props.errors.password && props.touched.password && (
            <Typography color="error" fontSize={12} paddingLeft=".5rem">
              {props.errors.password}
            </Typography>
          )}
        </Box>

        <Divider />

        <Button
          type="submit"
          variant="contained"
          sx={{ textTransform: "capitalize", backgroundColor: "#58595B" }}
          startIcon={
            isSubmitting && <CircularProgress color="inherit" size={18} />
          }
        >
          Login
        </Button>
      </Stack>
    </Form>
  );
};

export default FormLogin;
