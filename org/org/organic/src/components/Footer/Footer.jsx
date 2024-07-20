import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import logo from "../../assets/organic-store-white-logo.png";
import play from "../../assets/play-store.png";
import appStore from "../../assets/app-store.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

let listStyle = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  color: "rgba(255,255,255,0.66)",
};

const Footer = () => {
  const isMobile = useMediaQuery("(max-width : 660px)");

  return (
    <Box component={"footer"} bgcolor={"#001524"}>
      {/* Main footer Section starts here */}
      <Box py={"75px"}>
        <Box>
          <Box
            sx={{
              maxWidth: "1200px",
              mx: "auto",
              display: "grid",
              gridTemplateColumns: !isMobile ? "2fr 1fr 1fr" : "1fr",
              gridColumnGap: "10px",
              gridRowGap: "40px"
            }}
          >
            {/* Logo and Description section start here */}
            <Box px={isMobile ? "50px" : 0}>
              <Link to={"/"}>
                <Box mb={"45px"}>
                  <img style={{ height: "80px" }} src={logo} alt="" />
                </Box>
              </Link>
              <Box display={"flex"}>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "oblique",
                    color: "rgba(255,255,255,0.66)",
                    flexBasis: "75%",
                    flexGrow: 0,
                    fontWeight: "bold",
                  }}
                >
                  Welcome to Organic Store! Your one-stop destination for fresh and high-quality groceries. Shop now and experience convenience, quality, and exceptional service delivered to your doorstep.

                </Typography>
              </Box>
            </Box>

            {/*---- Logo and Description section Ends here --------- */}

            {/*----------Quick Links and Site links section start here ----- */}
            <Box px={isMobile ? "50px" : 0}>
              <Box>
                <Typography
                  variant="h4"
                  color="white"
                  fontSize={"22px"}
                  mb={"22px"}
                >
                  Quick Links
                </Typography>
                <ul style={{ ...listStyle, marginBottom: "45px" }}>
                  <Link to={"about"} style={{
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.66)",

                  }}><li >About</li></Link>
                  <Link to={"cart"} style={{
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.66)",

                  }}><li>Cart</li></Link>
                  <Link to={"checkout"} style={{
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.66)",

                  }}>
                    <li>Checkout</li></Link>
                  <Link to={"contact"} style={{
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.66)",

                  }}>
                    <li>Contact</li></Link>
                  <Link to={"/"} style={{
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.66)",

                  }}>
                    <li>Home</li></Link>
                  <Link to={"login"} style={{
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.66)",

                  }}>
                    <li>My Account</li></Link>
                  <Link to={"everything"} style={{
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.66)",

                  }}>
                    <li>Shop</li></Link>
                </ul>
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  color="white"
                  fontSize={"22px"}
                  mb={"22px"}
                >
                  Site Links
                </Typography>
                <ul style={listStyle}>
                  <li>Privacy Policy</li>
                  <li>Shipping Details</li>
                  <li>Offers Coupons</li>
                  <li>Terms & Conditions</li>
                </ul>
              </Box>
            </Box>
            {/* Quick Links and Site links section ends here */}

            {/* Download section starts here */}
            <Box px={isMobile ? "50px" : 0}>
              <Box>
                <Typography
                  variant="h4"
                  color="white"
                  fontSize={"22px"}
                  mb={"22px"}
                >
                  Categories
                </Typography>
                <Link to={"product-category/Groceries"} style={{
                  textDecoration: 'none'
                }}><Typography variant="body1" color={"rgba(255,255,255,0.66)"}>
                    Groceries
                  </Typography></Link>
                <Link to={"product-category/Juice"} style={{
                  textDecoration: 'none'
                }}><Typography variant="body1" color={"rgba(255,255,255,0.66)"}>
                    Juices
                  </Typography></Link>
              </Box>
              <Box mt={"40px"}>
                <Typography
                  variant="h4"
                  color="white"
                  fontSize={"22px"}
                  mb={"22px"}
                >
                  Site Links
                </Typography>
                <ul style={listStyle}>
                  <li style={{ color: "#8bc34a" }}>Know More About Us</li>
                  <li style={{ color: "#8bc34a" }}>Visit Store</li>
                  <li style={{ color: "#8bc34a" }}>Let's Connect</li>
                  <li style={{ color: "#8bc34a" }}>Locate Stores</li>
                </ul>
                <Box mt={"20px"}>
                  <img
                    style={{
                      width: "125px",
                      height: "35px",
                      marginRight: "10px",
                    }}
                    src={play}
                    alt=""
                  />
                  <img
                    style={{ width: "125px", height: "35px" }}
                    src={appStore}
                    alt=""
                  />
                </Box>
              </Box>
            </Box>
            {/* Download section ends here */}
          </Box>
        </Box>
      </Box>
      {/* Main footer Section ends here */}

      {/* Copyright section */}
      <Box
        sx={{
          p: {
            xs: "20px 15px",
            md: "25px 30px",
          },
          borderTop: "1px solid rgba(125,125,125,0.27)",
          minHeight: "80px",
        }}
      >
        <Box>
          <Box
            maxWidth={"1200px"}
            mx={"auto"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="body1" sx={{ color: "#ffffffa8" }}>
              Copyright &copy; | Organic Store
            </Typography>
            <Box display={"flex"} gap={"20px"} alignItems={"center"}>
              <a href="https://www.facebook.com/profile.php?id=100055263184126" style={{ height: "18px" }}>
                <FaFacebook fontSize={"18px"} color="rgba(255,255,255,0.66)" />
              </a>
              <a href="https://twitter.com/" style={{ height: "18px" }}>
                <FaTwitter fontSize={"18px"} color="rgba(255,255,255,0.66)" />
              </a>
              <a href="https://www.instagram.com/" style={{ height: "18px" }}>
                <FaInstagram fontSize={"18px"} color="rgba(255,255,255,0.66)" />
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

// import { Box, Grid, Typography } from "@mui/material";
// import React from "react";
// import logo from "../../assets/organic-store-white-logo.png";
// import { Link } from "react-router-dom";
// import playstore from "../../assets/play-store.png";
// import appstore from "../../assets/app-store.png";
// import { Padding } from "@mui/icons-material";

// const Footer = () => {
//   return (
//     <Box
//       minHeight={"500px"}
//       bgcolor={"#001524"}
//       sx={{
//         px: {
//           xs: "20px",
//           md: "40px",
//           lg: "80px",
//         },
//         mt: "10px",
//       }}
//     >
//       <Grid container>
//         <Grid
//           item
//           xs={12}
//           md={4}
//           px={3}
//           sx={{
//             marginTop: "35px",
//           }}
//         >
//           <Box>
//             <img height={"79px"} width={"180px"} src={logo} style={{}} />
//           </Box>
//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: "15px",
//               fontWeight: "400",
//               color: "#FFFFFFA8",
//               marginTop: "18px",
//             }}
//           >
//             <strong>
//               <em>
//                 {" "}
//                 Maecenas mi justo, interdum at consectetur vel, tristique et
//                 arcu. Ut quis eros blandit, ultrices diam in, elementum ex.
//                 Suspendisse quis faucibus urna. Suspendisse pellentesque.
//               </em>
//             </strong>
//           </Typography>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Typography
//             variant="h2"
//             sx={{
//               fontSize: "22px",
//               fontWeight: "bold",
//               color: "#ffffff",
//               marginTop: "35px",
//               textAlign: "center",
//             }}
//           >
//             Quick Links
//           </Typography>
//           <ul
//             style={{
//               listStyle: "none",
//               textAlign: "center",
//               color: "white",
//               display: "flex",
//               flexDirection: "column",
//               gap: "5px",
//             }}
//           >
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//                 marginTop: "30px",
//               }}
//               to={"/About"}
//             >
//               <li>About</li>
//             </Link>
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//               }}
//               to={"/Cart"}
//             >
//               <li>Cart</li>
//             </Link>
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//               }}
//               to={"/Checkout"}
//             >
//               <li>Checkout</li>
//             </Link>
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//               }}
//               to={"/Contact"}
//             >
//               <li>Contact</li>
//             </Link>
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//               }}
//               to={"/"}
//             >
//               <li>Home</li>
//             </Link>
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//               }}
//               to={"/My account"}
//             >
//               <li>My account</li>
//             </Link>
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//               }}
//               to={"/Shop"}
//             >
//               <li>Shop</li>
//             </Link>
//           </ul>
//           <Typography
//             variant="h2"
//             sx={{
//               fontSize: "22px",
//               fontWeight: "bold",
//               color: "#ffffff",
//               marginTop: "30px",
//               textAlign: "center",
//             }}
//           >
//             Site Links
//           </Typography>
//           <ul
//             style={{
//               listStyle: "none",
//               textAlign: "center",
//               color: "white",
//               display: "flex",
//               flexDirection: "column",
//               gap: "5px",
//             }}
//           >
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//                 marginTop: "10px",
//               }}
//               to={"/PrivacyPolicy"}
//             >
//               <li>Privacy Policy</li>
//             </Link>
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//               }}
//               to={"/Shipping Details"}
//             >
//               <li>Shipping Details</li>
//             </Link>
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//               }}
//               to={"/Offers Coupons"}
//             >
//               <li>Offers Coupons</li>
//             </Link>
//             <Link
//               style={{
//                 color: "rgba(255,255,255,0.66)",
//                 textDecoration: "none",
//               }}
//               to={"/Terms & Conditions"}
//             >
//               <li>Terms & Conditions</li>
//             </Link>
//           </ul>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           md={4}
//           sx={{
//             margin: "0 0 10px",
//           }}
//         >
//           <Typography
//             variant="h2"
//             sx={{
//               fontSize: "20px",
//               fontWeight: "bold",
//               marginTop: "35px",
//               color: "#ffffff",
//               textAlign: "center",
//             }}
//           >
//             Download Our Mobile App
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{
//               fontSize: "14px",
//               fontWeight: "400",
//               color: "#FFFFFFA8",
//               marginTop: "10px",
//               textAlign: "center",
//             }}
//           >
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//             aliquam gravida sollicitudin. Praesent porta enim mi, non tincidunt
//             libero interdum sit amet.
//           </Typography>
//           <Typography
//             variant="h2"
//             sx={{
//               fontSize: "20px",
//               fontWeight: "400",
//               color: "#ffffff",
//               marginTop: "30px",
//               textAlign: "center",
//             }}
//           >
//             Quick Links
//           </Typography>
//           <ul
//             style={{
//               listStyle: "none",
//               textAlign: "center",
//               color: "white",
//               display: "flex",
//               flexDirection: "column",
//               gap: "2",
//             }}
//           >
//             <Link
//               style={{
//                 color: "#8bc34a",
//                 textDecoration: "none",
//               }}
//               to={"/Know More About Us"}
//             >
//               <li>Know More About Us</li>
//             </Link>
//             <Link
//               style={{
//                 color: "#8bc34a",
//                 textDecoration: "none",
//               }}
//               to={"/Visit Store"}
//             >
//               <li>Visit Store</li>
//             </Link>
//             <Link
//               style={{
//                 color: "#8bc34a",
//                 textDecoration: "none",
//               }}
//               to={"/Let’s Connect"}
//             >
//               <li>Let’s Connect</li>
//             </Link>
//             <Link
//               style={{
//                 color: "#8bc34a",
//                 textDecoration: "none",
//               }}
//               to={"/Locate Stores"}
//             >
//               <li> Locate Stores</li>
//             </Link>
//             <Typography
//               sx={{
//                 marginTop: "15px",
//               }}
//             >
//               <img src={playstore} height={"50px"} width={"180px"} />
//               <img src={appstore} height={"50px"} width={"180px"} />
//             </Typography>
//           </ul>
//         </Grid>
//       </Grid>

//       <Box
//         minHeight={"100px"}
//         bgcolor={"#001524"}
//         sx={{
//           px: {
//             xs: "20px",
//             md: "40px",
//             lg: "80px",
//           },
//           mt: "10px",
//         }}
//       >
//         <Grid container>
//           <Grid
//             item
//             xs={12}
//             md={4}
//             px={3}
//             sx={{
//               marginTop: "35px",
//             }}
//           >
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: "15px",
//                 color: "#FFFFFFA8",
//               }}
//             >
//               Copyright © 2023 | Organic Store
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;
