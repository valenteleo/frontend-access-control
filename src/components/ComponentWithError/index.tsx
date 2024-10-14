import { OutlinedFlagOutlined } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";
import { Card } from "antd";

interface ComponentWithErrorProps {
  error: Error;
}

const ComponentWithError: React.FC<ComponentWithErrorProps> = ({ error }) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        flex: 1,
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "90%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5" color={theme.palette.error.dark}>
            Ocorreu um erro!
          </Typography>

          <OutlinedFlagOutlined htmlColor={theme.palette.error.dark} />
        </Stack>

        <Typography>{error.stack}</Typography>
      </Card>
    </Stack>
  );
};

export default ComponentWithError;
