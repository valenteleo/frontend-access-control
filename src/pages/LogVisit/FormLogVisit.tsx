import {
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
  styled,
} from "@mui/material";
import { Form, FormikProps } from "formik";
import { ROUTES } from "../../appConfig/routes";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import CustomButton from "../../components/CustomButton";
import { CustomButtonVariant } from "../../components/CustomButton/CustomButtonVariant";
interface IFormValues {
  name: string;
  cpf: string;
  date: string;
}
interface FormLogVisitProps extends FormikProps<IFormValues> {
  isSubmitting: boolean;
  stateValues: IFormValues;
  setStateValues(form): void;
  isEdit: boolean;
}

const FormLogVisit: React.FC<FormLogVisitProps> = ({
  isSubmitting,
  stateValues,
  setStateValues,
  ...props
}: FormLogVisitProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const HelperText = styled(Typography)(({ theme }) => ({
    fontFamily: "Poppins",
    fontSize: 12,
    color: theme.palette.error.dark,
    paddingLeft: ".5rem",
  }));

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
                disabled={props.isEdit}
                fullWidth
                size="small"
                name={items.name}
                value={stateValues[items.name]}
                label={items.label}
                onChange={(event) => {
                  props.handleChange(event);
                  setStateValues((prevState) => ({
                    ...prevState,
                    [items.name]: event.target.value,
                  }));
                }}
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
        </Stack>

        <Box width="100%">
          <DatePicker
            format={"DD/MM/YYYY"}
            placeholder="Selecione"
            style={{ width: "100%", borderColor: theme.palette.grey[400] }}
            size="large"
            value={
              stateValues.date ? dayjs(stateValues.date, "YYYY-MM-DD") : null
            }
            disabledDate={disabledDate}
            onChange={(date: dayjs.Dayjs) => {
              props.setFieldValue("date", date.format("YYYY-MM-DD"));
              setStateValues((prevState) => ({
                ...prevState,
                date: date.format("YYYY-MM-DD"),
              }));
            }}
            onBlur={props.handleBlur}
          />
          {props.errors.date && props.touched.date && (
            <HelperText>{props.errors.date}</HelperText>
          )}
        </Box>
      </Stack>

      <Divider sx={{ marginY: "2rem" }} />

      <Stack flexDirection="row" justifyContent="flex-end" gap={1}>
        <CustomButton
          title="Cancelar"
          variant={CustomButtonVariant.OUTLINED}
          onClick={() => navigate(ROUTES.HOME)}
        />
        <CustomButton
          title="Salvar"
          type="submit"
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

export default FormLogVisit;
