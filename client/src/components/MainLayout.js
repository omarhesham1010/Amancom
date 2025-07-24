import React, { useState } from "react";
import { NavLink, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Devices from "../pages/Devices";
import Subscriptions from "../pages/Subscriptions";
import Notifications from "../pages/Notifications";
import SIMs from "../pages/SIMs";
import Employees from "../pages/Employees";

const SIDEBAR_WIDTH = 200;
const HEADER_HEIGHT = 64;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${HEADER_HEIGHT}px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-bottom: 1px solid #f0f0f0;
  z-index: 2000;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const Logo = styled.img`
  width: 120px;
  height: 40px;
  object-fit: contain;
  @media (max-width: 600px) {
    width: 80px;
    height: 30px;
  }
`;

const Hamburger = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: 0.7rem;
  z-index: 2100;
`;

const Bar = styled.span`
  display: block;
  width: 26px;
  height: 3px;
  margin: 3px 0;
  background: #003366;
  border-radius: 2px;
  transition: 0.3s;
`;

const Sidebar = styled.aside`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  width: ${SIDEBAR_WIDTH}px;
  background: #003366;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1rem 0 1rem 0;
  box-shadow: 2px 0 16px rgba(0,0,0,0.10);
  border-radius: 0 18px 18px 0;
  z-index: 1500;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
  &.open {
    transform: translateX(0);
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  width: 100vw;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  background: rgba(0,0,0,0.18);
  z-index: 1400;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 1.2rem;
`;

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-size: 1.08rem;
  font-weight: 500;
  padding: 0.7rem 2rem;
  border-radius: 8px 0 0 8px;
  display: block;
  transition: background 0.2s;
  &.active, &:hover {
    background: #D32F2F;
    color: #fff;
  }
  @media (max-width: 900px) {
    padding: 0.7rem 0.7rem;
    text-align: left;
    font-size: 0.95rem;
    border-radius: 8px;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0;
  transition: margin-left 0.3s cubic-bezier(.4,0,.2,1);
  @media (min-width: 901px) {
    margin-left: ${props => (props.sidebarOpen ? `${SIDEBAR_WIDTH}px` : '0')};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const LogoutBtn = styled.button`
  background: #D32F2F;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(211,47,47,0.07);
  transition: background 0.2s;
  &:hover {
    background: #b71c1c;
  }
`;

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/clients", label: "Clients" },
  { to: "/devices", label: "Devices" },
  { to: "/subscriptions", label: "Subscriptions" },
  { to: "/notifications", label: "Notifications" },
  { to: "/sims", label: "SIMs" },
  { to: "/employees", label: "Employees" },
];

function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSidebarToggle = () => setSidebarOpen((open) => !open);
  const handleOverlayClick = () => setSidebarOpen(false);

  // Responsive: update sidebar state on resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Header>
        <LogoRow>
          <Hamburger onClick={handleSidebarToggle} aria-label="Toggle sidebar" tabIndex={0}>
            <Bar />
            <Bar />
            <Bar />
          </Hamburger>
          <Logo src={logo} alt="Amancom Logo" />
        </LogoRow>
        <UserInfo>
          <span style={{ color: "#003366", fontWeight: 500 }}>Admin</span>
          <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
        </UserInfo>
      </Header>
      <Overlay open={sidebarOpen && window.innerWidth <= 900} onClick={handleOverlayClick} />
      <Sidebar className={sidebarOpen ? "open" : ""}>
        <NavList>
          {navLinks.map(link => (
            <NavItem key={link.to}>
              <StyledNavLink
                to={link.to}
                onClick={() => {
                  if (window.innerWidth <= 900) setSidebarOpen(false);
                }}
              >
                {link.label}
              </StyledNavLink>
            </NavItem>
          ))}
        </NavList>
      </Sidebar>
      <Main sidebarOpen={sidebarOpen} style={{ marginTop: HEADER_HEIGHT, padding: "2rem", background: "#f7f7f7", minHeight: "100vh" }}>
        <div style={{ marginTop: 0 }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/sims" element={<SIMs />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Main>
    </>
  );
}

export default MainLayout; 