/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
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
  profile: string;
}

interface FormRegisterProps extends FormikProps<IFormValues> {
  isSubmitting: boolean;
}

const FormRegister: React.FC<FormRegisterProps> = ({
  isSubmitting,
  ...props
}: FormRegisterProps) => {
  const [profile, setProfile] = useState("");

  const fields = [
    { name: "name", label: "Nome" },
    { name: "email", label: "E-mail" },
    { name: "password", label: "Senha" },
  ];

  const profileTypes = [
    { value: 0, label: "Administrador" },
    { value: 1, label: "Usuário" },
  ];

  const whichType = (type: string): string => {
    return type === "email" ? "email" : "text";
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

            {props.errors[items.name] && props.touched[items.name] && (
              <Typography color="error" fontSize={12} paddingLeft=".5rem">
                {props.errors[items.name]}
              </Typography>
            )}
          </Box>
        ))}

        <Box flex={1}>
          <Select
            fullWidth
            label="Perfil"
            size="small"
            value={profile}
            onChange={({ target }) => {
              setProfile(target.value);
              props.setFieldValue("profile", target.value);
            }}
          >
            {profileTypes.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>

          {props.errors.profile && props.touched.profile && (
            <Typography color="error" fontSize={12} paddingLeft=".5rem">
              {props.errors.profile}
            </Typography>
          )}
        </Box>

        <Divider />

        <Stack direction="row" justifyContent="flex-end" gap={1}>
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
      </Stack>
    </Form>
  );
};

export default FormRegister;
