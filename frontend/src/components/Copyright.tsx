import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as Links } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" pl={2} {...props}>
      <Link component={Links} color="inherit" to="/">
        Cat Tube
      </Link>
      &nbsp;
      {"©"}
      <Link color="inherit" href="https://supercutcat.com" target="_blank">
        supercutcat
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;
