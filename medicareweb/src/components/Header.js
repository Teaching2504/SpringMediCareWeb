import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { MyUserContext } from "../configs/Contexts";

const Header = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const nav = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });

    nav("/login");
  };

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="logo-area">
          <div className="logo-circle">M</div>
          <div>
            <h1 className="brand-name">MediCare</h1>
            <span className="brand-sub">Phòng khám đa khoa trực tuyến</span>
          </div>
        </div>

        <nav className="main-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/doctor">Bác sĩ</Link>
          <Link to="/specialty">Chuyên khoa</Link>

          {user === null ? (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register" className="btn-nav">
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <span>Xin chào, {user.firstName}</span>
              <button type="button" className="btn-nav" onClick={logout}>
                Đăng xuất
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
