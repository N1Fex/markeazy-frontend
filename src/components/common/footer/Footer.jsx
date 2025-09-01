import React from 'react';
import "./Footer.css";
import {Container, Grid, Stack, Typography} from "@mui/material";
import Logotype from "../Logotype";
import {NavLink} from "react-router-dom";

const footerCategories = {
  "GENERAL": [
    {name: "Questions", to: "/questions/"},
    {name: "Help", to: "/help/"},
  ],
  "PRODUCTS": [
    {name: "Teams", to: "/teams/"},
    {name: "Advertising", to: "/advertising/"},
    {name: "Talent", to: "/talent/"},
  ],
  "COMPANY": [
    {name: "About", to: "/about/"},
    {name: "Legal", to: "/legal/"},
    {name: "Privacy Police", to: "/legal/privacy-police"},
    {name: "Terms of Service", to: "/legal/terms-of-service"},
    {name: "Contact Us", to: "/contact/"},
    {name: "Cookie Policy",  to: "/cookie-policy/"},
  ],
  "SOCIAL MEDIA": [
    {name: "VK", to: "/"},
    {name: "Telegram", to: "/"},
    {name: "Linkedln", to: "/"},

  ],
}

const Footer = () => {
  return (
    <footer>
      <Container sx={{margin: "0 auto", overflow: "auto"}}>
        <Container sx={{height: 64, width:"auto", marginY: 1, display: "flex", justifyContent: {xs: "center", md: "start"}}} style={{padding: 0}}>
          <Logotype type={"logoFull"}/>
        </Container>
        <Grid container spacing={2} sx={{marginY: 2}}>
          {
            Object.entries(footerCategories).map(([key, value], index) => {
              return (
                <Grid size={{md: 3, xs: 6}} key={index}>
                  <Typography>{key}</Typography>
                  <Stack spacing={1} direction="column" sx={{marginY: 1.5}} key={index}>
                    {
                      value.map((d, i) =>
                        <NavLink key={index*Object.keys(footerCategories).length+i} className={"footer-link"} to={d.to}>
                          {d.name}
                        </NavLink>
                      )
                    }
                  </Stack>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>

    </footer>
  );
};

export default Footer;