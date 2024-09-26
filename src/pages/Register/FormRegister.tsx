/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProps } from "formik";
import { useState } from "react";

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

interface FormRegisterProps extends FormikProps<IFormValues> {
  isSubmitting: boolean;
}

const FormRegister: React.FC<FormRegisterProps> = ({
  isSubmitting,
  ...props
}: FormRegisterProps) => {
  const [showPass, setShowPass] = useState(false);

  const fields = [
    { name: "name", label: "Nome" },
    { name: "email", label: "E-mail" },
    { name: "password", label: "Senha" },
  ];

  const whichType = (type: string): string => {
    return type === "password" ? (showPass ? "text" : "password") : "text";
  };

  return (
    <Form onSubmit={props.handleSubmit}>
      <Stack sx={{ gap: "2rem" }}>
        {fields.map((items, index) => (
          <Box key={index}>
            <TextField
              fullWidth
              size="small"
              type={whichType(items.name)}
              name={items.name}
              label={items.label}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            {items.name === "password" && (
              <Stack direction="row" alignItems="center">
                <Checkbox
                  size="small"
                  color="#58595B"
                  checked={showPass}
                  onChange={() => setShowPass(!showPass)}
                />
                <Typography sx={{ fontSize: 12, color: "#58595B" }}>
                  Mostrar senha
                </Typography>
              </Stack>
            )}
            {props.errors[items.name] && props.touched[items.name] && (
              <Typography color="error" fontSize={12} paddingLeft=".5rem">
                {props.errors[items.name]}
              </Typography>
            )}
          </Box>
        ))}

        <Divider />

        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#58595B", textTransform: "capitalize" }}
          startIcon={
            isSubmitting && <CircularProgress color="inherit" size={18} />
          }
        >
          Cadastrar
        </Button>
      </Stack>
    </Form>
  );
};

export default FormRegister;
