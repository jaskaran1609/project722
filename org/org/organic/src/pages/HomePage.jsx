import React from "react";

import Banner from "../components/Banner/Banner";
import { Box, Typography, useMediaQuery } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import RecyclingIcon from "@mui/icons-material/Recycling";
import CustomButton from "../components/Button/Button";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import {
  lemons,
  cauli,
  soya,
  leaf,
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  vertorleaf,

} from "../assets";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const recommendationSection = [
  {
    id: 1,
    title: "Farm Fresh Fruits",
    desc: "Juicy, farm-fresh fruits delivered straight from the orchard to you.",
    bgImage: lemons,
  },
  {
    id: 2,
    title: "Fresh Vegetables",
    desc: "Naturally grown, farm-fresh vegetables for healthy meals and vibrant flavors.",
    bgImage: cauli,
  },
  {
    id: 3,
    title: "Organic Legume",
    desc: "Wholesome, sustainable organic legumes for healthy and eco-friendly meals.",
    bgImage: soya,
  },
];



const RecommendationCard = ({ content }) => {
  return (
    <div
      style={{
        height: "366px",
        padding: "40px 40px 160px",
        position: "relative",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${content.bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#ffffff",
          backgroundPosition: "bottom right",
          backgroundSize: "contain",
          opacity: 1,
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          position: "absolute",
          zIndex: "0",
          borderRadius: "8px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          position: "relative",
        }}
      >
        <Typography variant="h3">{content.title}</Typography>
        <Typography variant="body1">{content.desc}</Typography>
        <CustomButton
          text={"Shop Now"}
          icon={<FaArrowRight style={{ color: "white" }} />}
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, mainText, text }) => {
  return (
    <Box
      display={"flex"}
      flex={1}
      gap={"15px"}
      p={"35px 25px"}
      bgcolor={"#333333"}
    >
      {icon}
      <Box>
        <Typography color="white" variant="h4">
          {mainText}
        </Typography>
        <Typography color="white" variant="subtitle1">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width : 580px)");
  const isTablet = useMediaQuery(
    "(min-width : 580px) and (max-width : 1200px)"
  );

  const { products, loading, error } = useSelector(state => state.productState)

  return (
    <div>
      {/* Banner Start here */}
      <Banner />
      {/* Banner Ends here */}

      {/* Features section starts here */}
      <Box padding={"80px"} bgcolor={"#111111"} display={"flex"} gap={"25px"}>
        {/* card */}
        <FeatureCard
          mainText={"Free Shipping*"}
          text={"Above Rs.1000 only"}
          icon={
            <LocalShippingIcon
              sx={{ color: "green.main", fontSize: "2.3rem" }}
            />
          }
        />
        <FeatureCard
          mainText={"Certified Orgainc"}
          text={"100% Gurantee"}
          icon={
            <VerifiedUserIcon
              sx={{ color: "green.main", fontSize: "2.3rem" }}
            />
          }
        />
        <FeatureCard
          mainText={"Huge Savings"}
          text={"At Lowest Price"}
          icon={
            <LocalAtmIcon sx={{ color: "green.main", fontSize: "2.3rem" }} />
          }
        />
        <FeatureCard
          mainText={"Easy Returns"}
          text={"No Questions Asked"}
          icon={
            <RecyclingIcon sx={{ color: "green.main", fontSize: "2.3rem" }} />
          }
        />
      </Box>
      {/* Features section ends here */}

      {/* Product Section start here */}
      <Box bgcolor={"#fff"} p={"140px 0 50px"}>
        <Box maxWidth={"1200px"} mx={"auto"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            alignItems={"center"}
          >
            <Typography variant="h2" color={"#111"}>
              Best Selling Products
            </Typography>
            <img src={vertorleaf} alt="Leaf" />
          </Box>
          <Box padding={"70px 0"}>
            <Box
              display={"grid"}
              gridTemplateColumns={
                isMobile
                  ? "1fr"
                  : isTablet
                    ? "repeat(3, 1fr)"
                    : "repeat(4, 1fr)"
              }
              sx={{ gridColumnGap: "20px" }}
            >
              {products?.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Product Section ends here */}

      <Box sx={{ marginBottom: "-48px" }}>
        <Box sx={{ maxWidth: "600px", mx: "auto", textAlign: "center" }}>
          <img style={{ height: "70px" }} src={leaf} alt="" />
        </Box>
      </Box>

      {/* Recommendation section starts here */}
      <Box
        sx={{
          py: "100px",
          bgcolor: "#f8f6f3",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridColumnGap: "30px",
          }}
        >
          {recommendationSection.map((content) => (
            <RecommendationCard key={content.id} content={content} />
          ))}
        </Box>
      </Box>
      {/* Recommendation section ends here */}

      {/* Sale section start here */}
      <Box bgcolor={"#111111"} py={"60px"}>
        <Box
          maxWidth={"1100px"}
          mx={"auto"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography variant="h2" color={"white"}>
              Get 25% Off On Your First Purchase!
            </Typography>
          </Box>
          <Link to={"everything"}>
            <Box>
              <CustomButton text={"Shop Now"} icon={<FaShoppingCart />} />
            </Box>
          </Link>
        </Box>
      </Box>
      {/* Sale section ends here */}

      {/* Free Section start here */}
      <Box bgcolor={"#f8f6f3"}>
        <Box
          maxWidth={"600px"}
          mx={"auto"}
          minHeight={"100px"}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography
            textAlign={"center"}
            width={"100%"}
            variant="h3"
            color="black"
          >
            Try It For Free. No Registration Needed.
          </Typography>
        </Box>
      </Box>
      {/* Free Section ends here */}

      <Box
        maxWidth={"1200px"}
        mx={"auto"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"50px"}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            color: "black",
          }}
        >
          Featured Brands:
        </Typography>
        <img src={logo1} width={"178px"} height={"100px"} />
        <img src={logo2} width={"178px"} height={"100px"} />
        <img src={logo3} width={"178px"} height={"100px"} />
        <img src={logo4} width={"178px"} height={"100px"} />
        <img src={logo5} width={"178px"} height={"100px"} />
      </Box>
    </div>
  );
};

export default HomePage;
