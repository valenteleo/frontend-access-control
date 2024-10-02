import { forwardRef, SelectHTMLAttributes } from "react";
import { Stack, Typography, useTheme, styled } from "@mui/material";

interface SelectCustomProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string | number; label: string }[];
}

const Select = styled("select")(
  ({ theme }) => `
    font-family: Poppins;
    padding: .5rem;
    border-radius: 4px;
    border-color: ${theme.palette.grey[400]};
    color: ${theme.palette.grey[600]};
    outline: none;
    box-shadow: 0 0 0 2px ${theme.palette.primary.light}
    `
);

const Option = styled("option")(
  ({ theme }) => `
      font-family: Poppins;
      padding: .5rem;
      border-radius: 4px;
      border-color: ${theme.palette.grey[400]};
      color: ${theme.palette.grey[600]};
      font-weight: 600;
      `
);

const SelectCustom = forwardRef<HTMLSelectElement, SelectCustomProps>(
  ({ label, options, ...props }: SelectCustomProps, ref) => {
    const theme = useTheme();

    return (
      <Stack>
        <Typography
          sx={{
            color: theme.palette.grey[600],
            fontSize: ".9rem",
            fontFamily: "Poppins",
            fontWeight: "600",
          }}
        >
          {label}
        </Typography>
        <Select ref={ref} sx={{ ...props.style }} {...props}>
          <Option
            value=""
            disabled
            selected
            style={{
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.grey[400],
            }}
          >
            Selecione
          </Option>
          {options.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Stack>
    );
  }
);

export default SelectCustom;
