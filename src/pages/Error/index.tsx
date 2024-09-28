import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography>Página não encontrada</Typography>
      <Button onClick={() => navigate(ROUTES.REGISTER().USER)}>
        Voltar para o APP
      </Button>
    </Box>
  );
};

export default Error;
