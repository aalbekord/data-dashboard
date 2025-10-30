import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Layout = () => {
    return (
        <div>
            {/* Navbar is always displayed */}
            <NavBar />
            {/* Render the current route's component */}
            <Outlet />
        </div>
    );
};

export default Layout;
