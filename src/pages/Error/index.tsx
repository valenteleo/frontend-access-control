import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../appConfig/routes";
import { KeyboardArrowLeftOutlined } from "@mui/icons-material";

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography>Página não encontrada</Typography>

      <Stack direction="row" alignItems="center">
        <IconButton onClick={() => navigate(ROUTES.HOME)}>
          <KeyboardArrowLeftOutlined />
        </IconButton>
        <Typography>Voltar para o APP</Typography>
      </Stack>
    </Box>
  );
};

export default Error;
