/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, FormikProps } from "formik";
import { ROUTES } from "../../appConfig/routes";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface IFormValues {
  name: string;
  cpf: string;
  date: string;
}

interface FormLogVisitProps extends FormikProps<IFormValues> {
  isSubmitting: boolean;
}

const FormLogVisit: React.FC<FormLogVisitProps> = ({
  isSubmitting,
  ...props
}: FormLogVisitProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const formFields = [
    { name: "name", label: "Nome" },
    { name: "cpf", label: "CPF" },
  ];

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  return (
    <Form onSubmit={props.handleSubmit}>
      <Stack flexDirection="row" gap={2}>
        <Stack width="100%" gap={2}>
          {formFields.map((items, index) => (
            <Box>
              <TextField
                key={index}
                fullWidth
                size="small"
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
        </Stack>

        <Box width="100%">
          <DatePicker
            format={"DD/MM/YYYY"}
            style={{ width: "100%" }}
            size="large"
            disabledDate={disabledDate}
            onChange={(date: dayjs.Dayjs) =>
              props.setFieldValue("date", date.format("YYYY-MM-DD"))
            }
            onBlur={props.handleBlur}
          />
          {props.errors.date && props.touched.date && (
            <Typography color="error" fontSize={12} paddingLeft=".5rem">
              {props.errors.date}
            </Typography>
          )}
        </Box>
      </Stack>

      <Divider sx={{ marginY: "2rem" }} />

      <Stack flexDirection="row" justifyContent="flex-end" gap={1}>
        <Button
          variant="outlined"
          sx={{
            borderColor: theme.palette.grey[700],
            textTransform: "capitalize",
            color: theme.palette.grey[700],
          }}
          onClick={() => navigate(ROUTES.REGISTER().USER)}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.grey[700],
            textTransform: "capitalize",
          }}
          startIcon={
            isSubmitting && <CircularProgress color="inherit" size={18} />
          }
        >
          Salvar
        </Button>
      </Stack>
    </Form>
  );
};

export default FormLogVisit;
