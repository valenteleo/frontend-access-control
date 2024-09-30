import { Fragment } from "react";
import { TableCell, Typography, useTheme } from "@mui/material";
import { IMock } from ".";

const DynamicCells: React.FC<{ items: IMock }> = ({ items }) => {
  const theme = useTheme();

  const data = [items.name, items.cpf, items.date, items.status];

  const tagStylesStatus = (status: string) => {
    switch (status) {
      case "Agendado":
        return theme.palette.success.light;
      case "Compareceu":
        return theme.palette.info.light;
      case "Não compareceu":
        return theme.palette.warning.light;
      case "Cancelado":
        return theme.palette.error.dark;
      default:
        return "transparent";
    }
  };

  return (
    <Fragment>
      {data.map((item, index) => (
        <TableCell key={index}>
          <Typography
            sx={{
              backgroundColor:
                index === 3 ? tagStylesStatus(item) : "transparent",
              color:
                index === 3
                  ? theme.palette.common.white
                  : theme.palette.grey[700],
              textAlign: index === 3 ? "center" : "left",
              padding: 1,
              borderRadius: "8px",
              fontWeight: index === 3 ? 600 : "none",
              fontFamily: "Poppins",
            }}
          >
            {item}
          </Typography>
        </TableCell>
      ))}
    </Fragment>
  );
};

export default DynamicCells;
