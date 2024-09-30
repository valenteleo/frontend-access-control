import { Stack, TextField, Typography, Divider, styled } from "@mui/material";
import { Form, FormikProps } from "formik";
import CustomButton from "../../components/CustomButton";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";

interface IFormValues {
  name: string;
  employee: string;
}

const FormQRCode: React.FC<FormikProps<IFormValues>> = ({
  ...props
}: FormikProps<IFormValues>) => {
  const HelperText = styled(Typography)(({ theme }) => ({
    fontFamily: "Poppins",
    fontSize: 12,
    color: theme.palette.error.dark,
    paddingLeft: ".5rem",
  }));

  const disabled = (): boolean => {
    return !Object.values(props.values).every(Boolean);
  };

  return (
    <Form onSubmit={props.handleSubmit}>
      <Stack direction="column" gap="2rem">
        <Stack direction="column">
          <TextField
            name="name"
            size="small"
            label="Nome"
            type="text"
            placeholder="Insira"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
          />
          {props.errors.name && <HelperText>{props.errors.name}</HelperText>}
        </Stack>

        <Stack direction="column">
          <TextField
            name="employee"
            size="small"
            label="Matrícula"
            type="text"
            placeholder="Insira"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.employee}
          />
          {props.errors.employee && (
            <HelperText>{props.errors.employee}</HelperText>
          )}
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="flex-end">
          <CustomButton
            title="Gerar"
            type="submit"
            variant={
              disabled()
                ? CustomButtonVariant.DISABLED
                : CustomButtonVariant.CONTAINED
            }
          />
        </Stack>
      </Stack>
    </Form>
  );
};

export { FormQRCode };
