import React from "react";
import Header from "../Header/Header";
import CustomButton from "../Button/Button";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default HomeLayout;
