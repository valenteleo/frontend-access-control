import { Stack, Card, Typography, useTheme, Theme } from "@mui/material";
import React from "react";

const useStyles = (theme: Theme) => {
  return {
    title: {
      color: theme.palette.grey[700],
      fontFamily: "Poppins",
    },
    loginFormField: {
      height: "100vh",
    },
    cardForm: {
      flex: 1,
      display: "flex",
      alignSelf: "flex-end",
      flexDirection: "column",
      width: "25rem",
      padding: "1rem 1.5rem",
      gap: "2rem",
      boxShadow: "none",
      borderRadius: 0,
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",

      "@media screen and (max-width: 768px)": {
        alignSelf: "center",
        borderRadius: "8px",
        width: "80%",
        marginY: "1rem",
      },
    },
    cardFooter: { flex: 1, justifyContent: "flex-end", gap: ".5rem" },
  };
};

interface ICardLogin {
  title: string;
  children: React.ReactNode;
  content: React.ReactNode;
}

const CardLogin: React.FC<ICardLogin> = ({
  title,
  children,
  content,
}: ICardLogin) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Stack sx={styles.loginFormField}>
      <Card sx={styles.cardForm}>
        <Typography variant="h5" sx={styles.title}>
          {title}
        </Typography>

        {children}

        <Stack sx={styles.cardFooter}>{content}</Stack>
      </Card>
    </Stack>
  );
};

export default CardLogin;
