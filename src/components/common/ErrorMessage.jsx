import React from 'react';
import {Container, Typography} from "@mui/material";

const ErrorMessage = ({messages, sx}) => {
    if (typeof messages === "string") {
        messages = [messages];
    }
    return (
        <Container sx={{display: messages.length !==0 ? "flex" : "none", gap: 1,
            flexDirection: "column", justifyContent: "center", alignItems: "center", paddingY: 0.5, marginTop: 0.5, ...sx}}
                   style={{padding: 0}}>
            {
              messages.map((message, index) =>
                  <Container sx={{color: "#900000", bgcolor: "#ffd2d2", borderColor: "#f1a899", borderRadius: 1}} key={index}>
                    <Typography variant="caption" fontSize={16} key={index}>
                      {message}
                    </Typography>
                  </Container>
              )
            }

        </Container>

    );
};

export default ErrorMessage;