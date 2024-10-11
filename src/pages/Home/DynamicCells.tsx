import { Fragment } from "react";
import { TableCell, Typography, useTheme } from "@mui/material";
import { ScheduledVisits } from "../../modules/visits/models";
import { translateStatus } from "./translate";

const DynamicCells: React.FC<{ items: ScheduledVisits }> = ({ items }) => {
  const theme = useTheme();

  const data = [
    items.nome,
    items.cpf,
    items.datavis,
    items.usercad ?? "Usuário",
    translateStatus(items.status),
  ];

  const tagStylesStatus = (status: string) => {
    switch (status) {
      case "Agendado":
        return theme.palette.success.light;
      case "Atendido":
        return theme.palette.info.light;
      case "Omisso":
        return theme.palette.warning.light;
      case "Cancelado":
        return theme.palette.error.dark;
      default:
        return theme.palette.grey[700];
    }
  };

  return (
    <Fragment>
      {data.map((item, index) => (
        <TableCell key={index}>
          <Typography
            sx={{
              color:
                index === 4 ? tagStylesStatus(item) : theme.palette.grey[700],
              textAlign: "left",
              padding: 1,
              borderRadius: "8px",
              fontWeight: index === 4 ? 600 : "none",
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
