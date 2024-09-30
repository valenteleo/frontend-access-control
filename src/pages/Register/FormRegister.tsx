import {
  Box,
  Divider,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Form, FormikProps } from "formik";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";

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

  const HelperText = styled(Typography)(({ theme }) => ({
    fontFamily: "Poppins",
    fontSize: 12,
    color: theme.palette.error.dark,
    paddingLeft: ".5rem",
  }));

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
            {props.errors[items.name as keyof IFormValues] &&
              props.touched[items.name as keyof IFormValues] && (
                <HelperText>
                  {props.errors[items.name as keyof IFormValues]}
                </HelperText>
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
            <HelperText>{props.errors.profile}</HelperText>
          )}
        </Box>

        <Divider />

        <Stack direction="row" justifyContent="flex-end" gap={1}>
          <CustomButton
            type="submit"
            title="Cadastrar"
            variant={
              isSubmitting
                ? CustomButtonVariant.CONTAINED_LOADING
                : CustomButtonVariant.CONTAINED
            }
          />
        </Stack>
      </Stack>
    </Form>
  );
};

export default FormRegister;
