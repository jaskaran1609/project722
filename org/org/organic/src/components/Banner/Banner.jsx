import React from "react";
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import hero from "../../assets/hero.png";
import leaf from "../../assets/logo-leaf.png";
import heroBg from "../../assets/hero_bg.png";
import CustomButton from "../Button/Button";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  const isMobile = useMediaQuery("(max-width : 768px)");
  const isTablet = useMediaQuery(
    "(min-width : 769px) and (max-width : 1180px)"
  );

  return (
    <Box
      component={"main"}
      px={isMobile ? "25px" : isTablet ? "30px" : "80px"}
      py={"80px"}
      sx={{ position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          backgroundColor: "#f8f6f3",
          backgroundImage: `url(${heroBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "28% auto",
          backgroundPosition: "bottom right",
          opacity: "0.25",
          mixBlendMode: "multiply",
          transition: " background .3s,border-radius .3s,opacity .3s",
        }}
        className="overlay"
      ></div>
      <Box
        display={"flex"}
        gap={isTablet ? "20px" : "30px"}
        alignItems={"center"}
        flexDirection={isMobile ? "column" : "row"}
      >
        <Box width={isMobile ? "100%" : "50%"} order={isMobile ? 2 : 0}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={hero}
            alt="Product Image"
          />
        </Box>
        <Box
          mb={isMobile ? "40px" : "0"}
          order={isMobile ? 1 : 0}
          width={isMobile ? "100%" : "50%"}
          alignItems={isMobile ? "center" : "flex-start"}
          display={"flex"}
          flexDirection={"column"}
          gap={"25px"}
          pl={isMobile ? "0" : isTablet ? "30px" : "80px"}
        >
          <img
            style={{ width: "75px", height: "33px" }}
            src={leaf}
            alt="Leaf Image"
          />
          <Typography variant="h5">Best Quality Products</Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: `${isMobile ? "37px" : isTablet ? "35px" : "52px"}`,
              textAlign: `${isMobile ? "center" : "left"}`,
            }}
          >
            Join The Organic Movement!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              pr: `${isMobile ? "0" : isTablet ? "20px" : "50px"}`,
              fontSize: `${isMobile ? "14px" : isTablet ? "14px" : "16px"}`,
              textAlign: `${isMobile ? "center" : "left"}`,
            }}
          >
            Welcome to Organic Store! Your one-stop destination for fresh and high-quality groceries. Shop now and experience convenience, quality, and exceptional service delivered to your doorstep.
          </Typography>
          <Link to={"everything"}>
            <CustomButton text={"Shop Now"} icon={<FaShoppingCart style={{ fontSize: "18px" }} />} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
