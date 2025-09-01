import React from 'react';
import {Container, Typography} from "@mui/material";

const ErrorMessage = ({messages}) => {
    if (typeof messages === "string") {
        messages = [messages];
    }
    return (
        <Container sx={{color: "#900000", bgcolor: "#ffd2d2", borderColor: "#f1a899", borderRadius: 1,
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            paddingY: 0.5, marginTop: 0.5}}>
          {
            messages.map((message, index) =>
              <Typography variant="caption" fontSize={16} key={index}>
                {message}
              </Typography>
            )
          }
        </Container>
    );
};

export default ErrorMessage;