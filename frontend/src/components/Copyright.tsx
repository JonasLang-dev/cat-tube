import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" pl={2} {...props}>
      {"©"}
      &nbsp;
      <Link color="inherit" href="https://cat.supercatcut.com/">
        supercutcat
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;
