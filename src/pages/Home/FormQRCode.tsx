import { Stack, TextField, Button } from "@mui/material";
import { Form, FormikProps } from "formik";

interface IFormValues {
  name: string;
  employee: string;
}

const FormQRCode: React.FC<FormikProps<IFormValues>> = ({
  ...props
}: FormikProps<IFormValues>) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Stack direction="column" gap="2rem">
        <Stack direction="column">
          <TextField
            name="name"
            label="Nome"
            type="text"
            placeholder="Insira"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
          />
          {props.errors.name && (
            <span style={{ color: "#CC3D3D" }}>{props.errors.name}</span>
          )}
        </Stack>

        <Stack direction="column">
          <TextField
            name="employee"
            label="Matrícula"
            type="text"
            placeholder="Insira"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.employee}
          />
          {props.errors.employee && (
            <span style={{ color: "#CC3D3D" }}>{props.errors.employee}</span>
          )}
        </Stack>

        <Button
          type="submit"
          variant="contained"
          disabled={!Object.values(props.values).every(Boolean)}
          sx={{ backgroundColor: "#58595B" }}
        >
          Gerar QRCode
        </Button>
      </Stack>
    </Form>
  );
};

export { FormQRCode };
