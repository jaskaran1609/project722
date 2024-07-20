import { Box, Rating, Typography } from "@mui/material";
import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <Box width={"285px"} mx="auto">
      <Box width={"100%"}>
        <Link to={`/product/${product._id}`}>
          <img style={{ width: "100%" }} src={product.image} alt="" />
        </Link>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"5px"} py={"15px"}>
        <Typography
          variant="body2"
          textAlign={"center"}
          sx={{ opacity: "0.6" }}
        >
          {product?.category}
        </Typography>

        <Typography
          component={Link}
          to={`/product/${product._id}`}
          variant="h2"
          sx={{ fontSize: "16px", color: "#111", textAlign: "center" }}
        >
          {product.name}
        </Typography>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Rating
            name="simple-controlled"
            value={product.rating}
            precision={0.2}
            size="small"
            readOnly
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: "14.4px",
            color: "#333",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaRupeeSign />
          {product.price.toLocaleString("en-IN")}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
