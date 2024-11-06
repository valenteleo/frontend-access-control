import { Fragment } from "react";
import { TableCell, useTheme } from "@mui/material";
import { IUserData } from "../../modules/authentication/models";
import { Descriptions } from "../../components/Routes/RouteGuard";
import { capitalize } from "../../utils/format";

type IUserDataOmited = Omit<IUserData, "datacad" | "usuario_id">;

interface IDynamicCellsProps {
  info: IUserDataOmited;
}

const DynamicCells: React.FC<IDynamicCellsProps> = ({
  info,
}: IDynamicCellsProps) => {
  const theme = useTheme();
  const cells = [capitalize(info.nome), info.login, Descriptions[info.perfil]];

  const firstIndex = (idx: number): boolean => idx === 0;

  return (
    <Fragment>
      {cells.map((items, index) => (
        <TableCell
          key={index}
          //@ts-ignore
          sx={{
            color: theme.palette.grey[700],
            position: firstIndex(index) && "sticky",
            left: firstIndex(index) && 0,
            backgroundColor: firstIndex(index) && "#FFF",
          }}
        >
          {items}
        </TableCell>
      ))}
    </Fragment>
  );
};

export default DynamicCells;
