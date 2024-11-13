import { Fragment } from "react";
import { TableCell, Typography, useTheme } from "@mui/material";
import { ScheduledVisits } from "../../modules/visits/models";
import { translateStatus } from "./translate";
import { capitalize } from "../../utils/format";

const DynamicCells: React.FC<{ items: ScheduledVisits }> = ({ items }) => {
  const theme = useTheme();

  const data = [
    capitalize(items.nome),
    items.cpf,
    items.datavis,
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
        <TableCell
          //@ts-ignore
          sx={{
            position: index === 0 && "sticky",
            left: 0,
            backgroundColor: index === 0 && theme.palette.grey[100],
          }}
          key={index}
        >
          <Typography
            sx={{
              color:
                index === 3 ? tagStylesStatus(item) : theme.palette.grey[700],
              textAlign: "left",
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
