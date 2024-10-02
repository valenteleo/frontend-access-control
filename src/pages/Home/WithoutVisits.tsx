import { SelfImprovementOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const WithoutVisit: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: "2px dashed #58595B",
          borderRadius: "50%",
          padding: "1rem",
        }}
      >
        <SelfImprovementOutlined sx={{ fontSize: 100 }} htmlColor="#58595B" />
      </Box>
      <Typography sx={{ fontFamily: "Poppins", color: "#58595B" }}>
        Não há nenhuma visita agendada no momento.
      </Typography>
    </Box>
  );
};

export default WithoutVisit;
