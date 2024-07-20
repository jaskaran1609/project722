import React from "react";
import { Button, Typography } from "@mui/material";

const CustomButton = ({ text, handleClick, icon }) => {
  return (
    <Button
      variant="contained"
      sx={{
        width : "fit-content",
        bgcolor: "green.idle",
        p: "17px 34px",
        ":hover": {
          bgcolor: "green.main",
        },
      }}
    >
      <Typography
        component={"span"}
        variant="subtitle2"
        sx={{ display: "flex", alignItems: "center", gap: 1, color : "white"}}
      >
        {icon} {text}
      </Typography>
    </Button>
  );
};

export default CustomButton;
