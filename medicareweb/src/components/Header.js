import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
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
                    <Link to="/login">Đăng nhập</Link>
                    <Link to="/register" className="btn-nav">Đăng ký</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;