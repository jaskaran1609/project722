import { Avatar, Box, Button, Checkbox, Grid, InputLabel, Rating, Tab, Tabs, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReview, fetchSingleProduct } from "../slices/singleProduct";
import { addToCart } from "../slices/cartSlice";
import { FaRupeeSign, FaWhatsapp } from "react-icons/fa";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
import { addToWishlist } from "../slices/wishListSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`,
//     };
//   }

const SingleProduct = () => {
  const navigate = useNavigate()
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState("")
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const { user } = useSelector((state) => state.userState)
  const [value, setValue] = React.useState(0);
  const { id } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchSingleProduct({ id }));
  }, [id]);

  const owner_phone_number = 1234567890

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login")
    } else {
      dispatch(
        addToCart({
          token: user.token,
          productdata: {
            productId: product?._id,
            name: product?.name,
            image: product?.image,
            price: product?.price,
            qty: qty,
            discount: product?.discount,
          },
        })
      );
    }

  };
  const handleAddToWishlist = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login")
    } else {
      dispatch(
        addToWishlist({
          token: user.token,
          productdata: {
            productId: product?._id,
            name: product?.name,
            image: product?.image,
            price: product?.price,
            discount: product?.discount,
          },
        })
      );
    }

  };

  const handleAddReview = () => {
    if (!user || !message || !rating) {
      return
    }
    else {
      dispatch(addReview({
        productId: product._id,
        message,
        rating,
        token: user.token
      }))
      setMessage("")
      setRating(0)
    }
  }




  return (
    <Box py={"80px"} bgcolor="#f8f6f3">
      <Box maxWidth={"1200px"} mx={"auto"}>
        <Box>
          <Grid container>
            <Grid item xs={12} md={4} lg={6}>
              <img
                style={{ height: "600px", width: "600px" }}
                src={product?.image}
                alt=""
              />
            </Grid>
            <Grid item xs={12} md={8} lg={6} px={5}>
              <Typography variant="h2">{product?.name}</Typography>
              <Box display={"flex"} alignItems={"center"} gap={"2px"} mt={4}>
                <Typography
                  variant="h3"
                  fontWeight={"700"}
                  color="#333"
                  fontFamily={"'Open Sans', sans-serif"}
                >
                  <FaRupeeSign style={{
                    marginTop: "5px",
                    fontSize: "18px"

                  }} />{product?.price}
                </Typography>
                <Typography variant="body1"> + Free Shipping</Typography>
              </Box>
              <Box mt={4}>{product?.description}</Box>
              <Box
                display={"flex"}
                gap={"10px"}
                flexDirection={"column"}
                mt={4}
                borderBottom={"1px solid #e2e2e2"}
                pb={"20px"}
              >
                <Box display={"flex"}
                  gap={"10px"}>
                  <Box>
                    <button
                      onClick={(e) => {
                        if (qty > 1) {
                          setQty(qty - 1);
                        }
                      }}
                      style={{
                        padding: "5px 10px",
                        border: "0.5px solid #e2e2e2",
                      }}
                    >
                      -
                    </button>
                    <input
                      value={qty}
                      disabled
                      id="counter"
                      onChange={(e) => {
                        if (qty !== product?.countInStock) {
                          setQty(parseInt(e.target.value));
                        }
                      }}
                      type="number"
                      style={{
                        padding: "5px 10px",
                        border: "1px solid lightgray",
                        outline: "none",
                        width: "50px",
                        textAlign: "center",
                      }}
                    />
                    <button
                      onClick={(e) => {
                        if (qty < product?.countInStock) {
                          setQty(qty + 1);
                        }
                      }}
                      style={{
                        padding: "5px 10px",
                        border: "0.5px solid #e2e2e2",
                      }}
                    >
                      +
                    </button>
                  </Box>
                  <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    sx={{
                      color: "white",
                      bgcolor: "green.idle",
                      "&:hover": {
                        bgcolor: "green.main",
                      },
                    }}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    onClick={handleAddToWishlist}
                    variant="contained"
                    sx={{
                      color: "white",
                      bgcolor: "green.idle",
                      "&:hover": {
                        bgcolor: "green.main",
                      },
                    }}
                  >
                    ADD TO WISHLIST
                  </Button>
                </Box>
                <Button
                  onClick={() => {
                    const url = `https://api.whatsapp.com/send?phone=${owner_phone_number}&text=I'm interested in your ${product?.name} product.`;
                    window.open(url, "_blank");
                  }}
                  variant="contained"
                  sx={{
                    color: "white",
                    bgcolor: "green.idle",
                    "&:hover": {
                      bgcolor: "green.main",
                    },
                    width: "fit-content"
                  }}
                >
                  <FaWhatsapp
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                    }}
                  />
                  Buy on WhatsApp
                </Button>
              </Box>
              <Box display={"flex"} gap={"10px"} mt={2}>
                <Typography variant="body2">
                  Categories :{" "}

                  <Link

                    to={`/product-category/${product?.category}`}
                    style={{ textDecoration: "none", color: "#8bc34a" }}
                  >
                    {product?.category}
                  </Link>

                </Typography>
              </Box>
              <Box
                display={"flex"}
                gap={"10px"}
                mt={4}
                borderBottom={"1px solid #e2e2e2"}
                pb={"20px"}
              >
                Share :{" "}
                <FacebookShareButton
                  url={window.location.href}
                  windowHeight={"800px"}
                  windowWidth={"800px"}
                  windowPosition="windowCenter"

                >
                  <FacebookIcon round={true} size={"25px"} />
                </FacebookShareButton>
                <WhatsappShareButton
                  url={window.location.href}
                  windowHeight={"800px"}
                  windowWidth={"800px"}
                  windowPosition="windowCenter"
                  separator="--"
                  title={product?.name}
                >
                  <WhatsappIcon round={true} size={"25px"} />
                </WhatsappShareButton>
                <TwitterShareButton
                  url={window.location.href}
                  windowHeight={"800px"}
                  windowWidth={"800px"}
                  windowPosition="windowCenter"
                >
                  <TwitterIcon round={true} size={"25px"} />
                </TwitterShareButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* Description and reviews */}
        <Box mt={5}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              indicatorColor="primary"
              //   sx={{
              //     color : "black",
              //     "& div span" : {
              //         backgroundColor : "#8bc34a"
              //     }
              //   }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{
                  fontSize: "16px",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "700",
                  color: "#515151",
                  "&.Mui-selected": {
                    fontSize: "16px",
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: "700",
                    color: "#515151",
                  },
                }}
                label="Description"
              />
              <Tab
                sx={{
                  fontSize: "16px",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "700",
                  color: "#515151",
                  "&.Mui-selected": {
                    fontSize: "16px",
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: "700",
                    color: "#515151",
                  },
                }}
                label={`Reviews (${product?.numOfReviews})`}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography variant="body1">
              {product?.description}
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {
              product?.reviews?.length < 1 ? (
                <Box>
                  <Typography variant="body1">There are no reviews yet.</Typography>
                </Box>
              ) : (<Box>
                {
                  product?.reviews?.map((review) => {
                    return (
                      <Box display={"flex"} gap={"40px"} my={"15px"}>
                        <Box>
                          <Avatar>
                            {review.username.charAt(0).toUpperCase()}
                          </Avatar>
                        </Box>
                        <Box>
                          <Typography variant="h4">
                            {review.username}
                          </Typography>
                          <Rating readOnly size="small" value={review.rating} color="primary" />
                          <Typography>
                            Message : {review.message}
                          </Typography>
                        </Box>
                      </Box>)
                  })
                }
              </Box>)
            }

            <Box border={"1px solid #dddddd"} mt={"20px"} p={"26px"}>

              <Box>
                <Typography variant="h4">
                  {
                    product?.reviews?.length < 1 ? `Be the First to Review (${product.name})` : "Add A Review"
                  }
                </Typography>
                <Typography sx={{ mt: "10px", color: "#b3a8a8" }} variant="subtitle2" >Your email address will not be published. Required fields are marked *</Typography>
                <Box display={"flex"} m={"15px 0px"}>
                  <Typography sx={{ mr: "10px" }} variant="body1" fontSize={"18px"}>Your rating *</Typography>
                  <Rating value={rating} onChange={(e, value) => setRating(value)} color="primary" />

                </Box>
                <Box m={"2px 0 6px"} >
                  <Typography variant="body1" fontSize={"18px"} >Your review *</Typography>
                  <TextField value={message} onChange={(e) => {
                    setMessage(e.target.value)
                  }} type='text' label="Message" multiline rows={4} fullWidth sx={{
                    my: "15px"
                  }}> </TextField>
                </Box>
                <Box>
                  <Button
                    onClick={handleAddReview}
                    variant='contained' sx={{
                      mt: 3,
                      bgcolor: "green.idle"
                    }} size='large'  >
                    Submit
                  </Button>


                </Box>




              </Box>
            </Box>

          </TabPanel>
        </Box>
        <Box>

        </Box>
      </Box>
    </Box>
  );
};

export default SingleProduct;
