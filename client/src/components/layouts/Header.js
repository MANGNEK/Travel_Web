import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
    MDBPopover,
    MDBPopoverHeader,
    MDBPopoverBody,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/features/authSlice";
import { searchTours } from "../../redux/features/tourSlice";
import { Link, useNavigate } from "react-router-dom";
// import decode from "jwt-decode";

const Header = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            dispatch(searchTours(search));
            navigate(`/tours/search?searchQuery=${search}`);
            setSearch("");
        } else {
            navigate("/");
        }
    };

    const handleLogout = () => {
        dispatch(setLogout());
    };

    const hadleMouseOver = () => {
        console.log("test");
    };

    return (
        <MDBNavbar
            fixed="top"
            expand="lg"
            style={{ backgroundColor: "#585f6b" }}
        >
            <MDBContainer>
                <MDBNavbarBrand
                    href="/"
                    style={{
                        color: "#efd2def2",
                        fontWeight: "600",
                        fontSize: "22px",
                    }}
                >
       <img
            src="https://img.freepik.com/free-vector/detailed-travel-logo_23-2148629241.jpg?w=740&t=st=1702996281~exp=1702996881~hmac=5e34459936ea8a8f150beca9248ebd2371f0e4a4482ac8161225f190d4266e54"
            alt="Logo"
            style={{ marginRight: "35px", height: "70px" }}
          />
                    TRAVEL
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    aria-expanded="false"
                    aria-label="Toogle navigation"
                    onClick={() => setShow(!show)}
                    style={{ color: "#efd2def2" }}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav
                        right
                        fullWidth={false}
                        className="mb-2 mb-lg-0"
                    >
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">
                                <p className="header-text">Trang Chủ</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/tours">
                                <p className="header-text">Tour</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/room">
                                <p className="header-text">Phòng</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id &&
                            user?.result?.authority !== "NORMAL" && (
                                <>
                                    {user?.result?.authority !== "ADMIN" &&
                                        user?.result?.authority !==
                                            "MANAGER" && (
                                            <>
                                                <MDBNavbarItem>
                                                    <MDBNavbarLink href="/addTour">
                                                        <p className="header-text">
                                                            Thêm Tour
                                                        </p>
                                                    </MDBNavbarLink>
                                                </MDBNavbarItem>
                                                <MDBNavbarItem>
                                                    <MDBNavbarLink href="/addRoom">
                                                        <p className="header-text">
                                                            Thêm Phòng
                                                        </p>
                                                    </MDBNavbarLink>
                                                </MDBNavbarItem>
                                            </>
                                        )}
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href="/dashboard">
                                                <p className="header-text">
                                                    DashBoard
                                                </p>
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                </>
                            )}
                        <MDBNavbarItem className="d-flex align-items-center">
                            <form
                                className="d-flex input-group w-auto"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm Kiếm"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <div
                                    style={{
                                        marginTop: "5px",
                                        marginLeft: "8px",
                                    }}
                                >
                                    <MDBIcon
                                        fas
                                        icon="search"
                                        onClick={handleSubmit}
                                        style={{color: "#efd2def2"}}
                                    />
                                </div>
                            </form>
                        </MDBNavbarItem>
                        {user?.result?._id ? (
                            <h5 className="header__navbar-user my-0">
                                <MDBIcon
                                    fas
                                    icon="user-alt"
                                    className="align-self-center ms-3"
                                    style={{color: "#efd2def2"}}
                                />
                                <ul className="header__navbar-user-menu">
                                    <li className="header__navbar-user-item">
                                        <Link to="/user/information">
                                            <p className="mt-3 mb-1">
                                               <b>Tài Khoản Của Tôi</b>
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="header__navbar-user-item">
                                        <Link to={`/changePassword/${user?.result?._id}`}>
                                            <p className="mt-0 mb-1">
                                                <b>Đổi Mật Khẩu</b>
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="header__navbar-user-item header__navbar-user-item--separate">
                                        <Link to="/login">
                                            <p
                                                className="mt-0 mb-1"
                                                onClick={() => handleLogout()}
                                            >
                                                <b>Đăng Xuất</b>
                                            </p>
                                        </Link>
                                    </li>
                                </ul>
                            </h5>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login">
                                    <p className="header-text">Đăng Nhập</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Header;
