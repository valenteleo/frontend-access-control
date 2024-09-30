import {
  Card,
  Theme,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";

const useStyles = (theme: Theme) => {
  return {
    cardStyle: {
      display: "flex",
      alignItems: "center",
      borderRadius: "4px",
      boxShadow: "none",
      padding: "1rem 1.5rem",
      gap: 2,
    },
    titleStyle: {
      color: theme.palette.grey[600],
      fontWeight: 600,
      fontSize: "1.2rem",
      fontFamily: "Poppins",
    },
  };
};

interface ITitleBarPage extends TypographyProps {
  title: string;
  icon?: React.ReactNode;
}

const TitleBarPage: React.FC<ITitleBarPage> = ({
  title,
  icon,
  ...props
}: ITitleBarPage) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Card sx={styles.cardStyle}>
      {icon}
      <Typography sx={styles.titleStyle} {...props}>
        {title}
      </Typography>
    </Card>
  );
};

export default TitleBarPage;
