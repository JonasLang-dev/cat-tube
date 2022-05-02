import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as Links } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" pl={2} {...props}>
      毕业设计 - 郎国昱 & 黎英杰
    </Typography>
  );
}

export default Copyright;
