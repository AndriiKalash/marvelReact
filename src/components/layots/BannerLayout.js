import { Outlet } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";


const BannerLayout = () => (
    <>
    <AppBanner/>
    <Outlet/>
    </>
);

export default BannerLayout;