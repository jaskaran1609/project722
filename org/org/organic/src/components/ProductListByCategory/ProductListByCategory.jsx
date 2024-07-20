import {
  Box,
  Typography,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Slider,
  Pagination,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, filterProducts, setPriceRange, setSearchQuery, setSort } from "../../slices/productSlice";
import { paginate } from "../../utils/utils";



const ProductListByCategory = () => {
  const { categoryName } = useParams()

  const dispatch = useDispatch()
  // const [sort, setSort] = useState(1);
  // const [priceRange, setPriceRange] = useState([0, 100000])
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(6)
  const {

    filteredProducts,
    searchQuery,
    priceRange,
    sort
  } = useSelector((state) => state.productState);
  const { pathname } = useLocation()

  const [range, setRange] = useState([priceRange.min, priceRange.max]);



  // const handlePriceChange = (e, value) => {
  //   setPriceRange(value);
  // };

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])

  useEffect(() => {
    dispatch(filterProducts());
  }, [searchQuery, priceRange, sort]);

  useEffect(() => {
    setPage(1)
  }, [pathname]);

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };


  const handlePriceChange = (e, value) => {
    // console.log(value)
    setRange(value)
    dispatch(setPriceRange({ min: value[0], max: value[1] }));
  };

  const handleClearFilter = () => {
    dispatch(setSearchQuery(""))
    dispatch(setPriceRange({ min: 0, max: 200000 }))
    dispatch(filterProducts());
    setRange([0, 200000]);

  };




  const handleSort = (e) => {
    dispatch(setSort(e.target.value))
  };

  const handlePaginate = (e, value) => {
    setPage(value);
  };


  let paginatedProducts = filteredProducts && paginate(filteredProducts?.filter(product => product.category.includes(categoryName)), page - 1, pagesize)

  return (
    <Box
      sx={{
        py: "80px",
        px: {
          xs: "20px",
          md: "20px",
          lg: "0",
        },
      }}
      bgcolor={"#f8f6f3"}
    >
      <Box maxWidth={"1280px"} mx={"auto"}>
        <Grid container>
          <Grid
            item
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
            xs={0}
            md={3}
            px={"20px"}
            borderRight={"1px solid #ddd"}
          >
            <Box>
              <TextField
                label="Search"
                placeholder="Search Products..."
                size="small"
                value={searchQuery}
                onChange={handleSearch}
              />
              <IconButton
                sx={{
                  bgcolor: "green.main",
                  borderRadius: "5px",
                  color: "white",
                  ml: "5px",
                }}
              >
                <FaChevronRight />
              </IconButton>
            </Box>
            <Box mt={5}>
              <Typography variant="h4" color={"#333"}>
                Filter By Price
              </Typography>
              <Box mt={3} pr={"30px"}>
                <Slider
                  size="small"
                  getAriaLabel={() => "Price Range"}
                  value={range}
                  onChange={handlePriceChange}
                  step={200}
                  max={10000}

                />
              </Box>
            </Box>
            <Box mt={5}>
              <Typography variant="h4" color={"#333"}>
                Filter By Category
              </Typography>
              <Box mt={3} pr={"30px"} display={"flex"} flexDirection={"column"} gap={"10px"}>
                <Link style={{ textDecoration: "none", color: "#8bc34a" }} to={"/product-category/Groceries"}>Groceries</Link>
                <Link style={{ textDecoration: "none", color: "#8bc34a" }} to={"/product-category/Juices"}>Juices</Link>
              </Box>
            </Box>
            <Button
              size="large"
              variant="contained"
              onClick={handleClearFilter}
              sx={{
                mt: "20px",
                color: "white"

              }}
            >
              Clear
            </Button>

          </Grid>
          <Grid item xs={12} md={9} px={"40px"}>
            <Box sx={{ p: "15px 0" }}>
              <Breadcrumbs aria-label="breadcrumb">
                <MuiLink
                  component={Link}
                  underline="hover"
                  color="inherit"
                  to="/"
                >
                  Home{" "}
                </MuiLink>
                <MuiLink
                  component={Link}
                  underline="hover"
                  color="inherit"
                  to="/everything"
                >
                  Everything{" "}
                </MuiLink>
                <Typography color="text.primary">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</Typography>
              </Breadcrumbs>
            </Box>
            <Box>
              <Typography variant="h1" color={"green.main"}>
                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
              </Typography>
              <Typography mt={3} variant="body1" pr={"50px"}>
                Simplify your life with our online grocery store. Explore a wide range of high-quality products, order from the comfort of your home, and enjoy swift doorstep delivery.              </Typography>
            </Box>
            <Box mt={"40px"}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1">
                  Showing {((page - 1) * pagesize) + 1} - {((page - 1) * pagesize) + (paginatedProducts?.length < pagesize ? paginatedProducts.length : pagesize)} of {filteredProducts?.filter(product => product.category.includes(categoryName)).length} results
                </Typography>
                <FormControl size="small" sx={{ width: "30%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Default Sorting
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Default Sorting"
                    onChange={handleSort}
                  >
                    <MenuItem value={0}>Unsorted</MenuItem>
                    <MenuItem value={-1}>Sort : High to low</MenuItem>
                    <MenuItem value={1}>Sort : Low to High</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box py={"50px"} minHeight={"700px"}>
                {/* render products */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridColumnGap: "20px",
                    gridRowGap: "40px",
                  }}
                >
                  {paginatedProducts?.filter(product => product.category.includes(categoryName))?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </Box>

              </Box>
              <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Pagination count={Math.ceil(filteredProducts?.filter(product => product.category.includes(categoryName))?.length / pagesize) || 0}
                  color="primary"
                  sx={{
                    "& .Mui-selected": {
                      color: "white"
                    }
                  }}
                  size="small"
                  page={page}
                  onChange={handlePaginate} />

              </Box>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductListByCategory;
