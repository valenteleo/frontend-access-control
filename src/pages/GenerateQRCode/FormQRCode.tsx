import { Stack, TextField, Button, Typography, Divider } from "@mui/material";
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
            size="small"
            label="Nome"
            type="text"
            placeholder="Insira"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
          />
          {props.errors.name && (
            <Typography color="error" fontSize={12} paddingLeft=".5rem">
              {props.errors.name}
            </Typography>
          )}
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
            <Typography color="error" fontSize={12} paddingLeft=".5rem">
              {props.errors.employee}
            </Typography>
          )}
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            disabled={!Object.values(props.values).every(Boolean)}
            sx={{ textTransform: "capitalize", backgroundColor: "#58595B" }}
          >
            Gerar
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export { FormQRCode };
