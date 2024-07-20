import { Box, Typography } from '@mui/material'
import React from 'react'
import leaf from "../assets/small_leaf.png";
import grapes from "../assets/grapes.jpg"
import { heroBg } from "../assets/index";


const AboutPage = () => {
    return (
        <Box pb={"70px"}>
            <Box bgcolor={"#f8f6f3"} py={"90px"}>
                <Typography variant='h1' textAlign={"center"}>
                    About US
                </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} mt={"-25px"}>
                <img style={{ height: "70px" }} src={leaf} alt="" />
            </Box>
            <Box >
                <Box display={"flex"} alignItems={"center"} maxWidth={"1200px"} p={"60px 0 120px"} marginRight={"auto"} marginLeft={"auto"}>
                    <Box width={"600px"} m={"0 80px 0 0"} p={"10px"}>

                        <Typography variant='h2' sx={{
                            marginBottom: "20px"
                        }}> We are your one-stop shop for all your Grocery needs
                        </Typography>
                        <Typography variant='body1' sx={{
                            marginBottom: "16px",
                            fontFamily: "'Open sans', sans-serif",
                            color: "#333333"

                        }}>Welcome to Organic Store, your ultimate destination for all things organic and wholesome. At Organic Store, we are passionate about providing you with the finest selection of organic products that promote a healthy and sustainable lifestyle. Our carefully curated range includes fresh, locally sourced produce, natural pantry essentials, and eco-friendly household items. We believe in supporting farmers and suppliers who share our commitment to organic practices and ethical standards. With a focus on quality, transparency, and customer satisfaction, we strive to be the go-to grocery store for health-conscious individuals and families. Embrace the goodness of nature with Organic Store – your gateway to a nourishing life.
                        </Typography>
                        {/* <Typography variant='body1' sx={{
                            fontFamily: "'Open sans', sans-serif",
                            color: "#333333"

                        }}>
                            Trust our robust backend API and efficient database management for reliable performance. Experience excellence at "We Are Your Favourite Store" today!


                        </Typography> */}

                    </Box>
                    <Box p={"10px"}>
                        <img style={{ width: "580px" }}
                            src={grapes} alt="" />
                    </Box>
                </Box>
            </Box>
            <Box padding={"30px"} bgcolor={"#111111"} display={"flex"} gap={2} >
                <Box p={"30px 0"} display={"flex"} alignItems={"center"} gap={5} marginLeft={"auto"} marginRight={"auto"}>
                    <Box width={"300px"} alignContent={"center"}>
                        <Typography variant='h4' color={"#ffffff"}>Numbers Speak For Themselves!</Typography>

                    </Box>
                    <Box width={"300px"} alignContent={"center"}>
                        <Typography variant='h1' color={"#ffffff"}> 5,000 +</Typography>
                        <Typography variant='h5' color={"#ffffff"}>Curated Products</Typography>
                    </Box>
                    <Box width={"300px"} alignContent={"center"}>
                        <Typography variant='h1' color={"#ffffff"}> 800 +</Typography>
                        <Typography variant='h5' color={"#ffffff"}>Curated Products</Typography>
                    </Box>
                    <Box width={"300px"} alignContent={"center"}>
                        <Typography variant='h1' color={"#ffffff"}> 40 +</Typography>
                        <Typography variant='h5' color={"#ffffff"}>Product Categories</Typography>
                    </Box>
                </Box>

            </Box>
            <Box sx={{
                position: "relative",
                height: "350px"
            }}>
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
                <Box maxWidth={"1200px"} mx={"auto"}>

                </Box>
            </Box>
        </Box >
    )
}

export default AboutPage