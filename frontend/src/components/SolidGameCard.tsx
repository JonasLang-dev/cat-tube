import React from "react";
import Color from "color"; 
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CardActionAreaActionArea = styled(CardActionArea)(() => ({
  borderRadius: 16,
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const StyledCard = styled(Card)(({ color }) => ({
  minWidth: 256,
  borderRadius: 16,
  boxShadow: "none",
  "&:hover": {
    boxShadow: `0 6px 12px 0 ${Color(color).rotate(-12).darken(0.2).fade(0.5)}`,
  },
}));

const CardContentContent = styled(CardContent)(({ color }) => {
  return {
    backgroundColor: color,
    padding: "1rem 1.5rem 1.5rem",
  };
});

const TypographyTitle = styled(Typography)(() => ({
  fontFamily: "Keania One",
  fontSize: "2rem",
  color: "#fff",
  textTransform: "uppercase",
}));

const TypographySubtitle = styled(Typography)(() => ({
  fontFamily: "Montserrat",
  color: "#fff",
  opacity: 0.87,
  marginTop: "2rem",
  fontWeight: 500,
  fontSize: 14,
}));

const GameCard = ({
  color,
  image,
  title,
  subtitle,
}: {
  color: string;
  image: string;
  title: string;
  subtitle: string;
}) => (
  <CardActionAreaActionArea>
    <StyledCard color={color}>
      <CardMedia
        image={image}
        sx={{
          width: "100%",
          height: 0,
          paddingBottom: "75%",
          backgroundColor: "rgba(0,0,0,0.08)",
        }}
      />
      <CardContentContent color={color}>
        <TypographyTitle variant={"h2"}>{title}</TypographyTitle>
        <TypographySubtitle>{subtitle}</TypographySubtitle>
      </CardContentContent>
    </StyledCard>
  </CardActionAreaActionArea>
);

export default GameCard;
