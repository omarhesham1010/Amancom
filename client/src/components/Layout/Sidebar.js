import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Dashboard, 
  People, 
  PhoneAndroid, 
  SimCard, 
  Subscriptions, 
  Notifications, 
  Group, 
  Assessment, 
  Settings,
  Menu,
  Close
} from '@mui/icons-material';

const SidebarContainer = styled.div`
  width: ${props => props.isOpen ? '250px' : '60px'};
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: all 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    width: ${props => props.isOpen ? '250px' : '0'};
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: ${props => props.isOpen ? 'space-between' : 'center'};
`;

const Logo = styled.div`
  font-size: ${props => props.isOpen ? '1.5rem' : '1.2rem'};
  font-weight: bold;
  color: white;
  white-space: nowrap;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavMenu = styled.nav`
  padding: 20px 0;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: ${props => props.active ? '#fff' : 'rgba(255,255,255,0.8)'};
  text-decoration: none;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'rgba(255,255,255,0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.active ? '#fff' : 'transparent'};

  &:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }

  span {
    margin-left: 15px;
    white-space: nowrap;
    overflow: hidden;
    opacity: ${props => props.isOpen ? '1' : '0'};
  }
`;

const IconWrapper = styled.div`
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Dashboard, roles: ['Owner', 'Admin', 'Support'] },
  { path: '/clients', label: 'Clients', icon: People, roles: ['Owner', 'Admin', 'Support'] },
  { path: '/devices', label: 'Devices', icon: PhoneAndroid, roles: ['Owner', 'Admin', 'Support'] },
  { path: '/sims', label: 'SIMs', icon: SimCard, roles: ['Owner', 'Admin', 'Support'] },
  { path: '/subscriptions', label: 'Subscriptions', icon: Subscriptions, roles: ['Owner', 'Admin', 'Support'] },
  { path: '/notifications', label: 'Notifications', icon: Notifications, roles: ['Owner', 'Admin', 'Support'] },
  { path: '/employees', label: 'Employees', icon: Group, roles: ['Owner', 'Admin'] },
  { path: '/reports', label: 'Reports', icon: Assessment, roles: ['Owner', 'Admin'] },
  { path: '/settings', label: 'Settings', icon: Settings, roles: ['Owner'] },
];

const Sidebar = ({ isOpen, toggleSidebar, userRole = 'Admin' }) => {
  const location = useLocation();

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <>
      <MobileOverlay isOpen={isOpen} onClick={toggleSidebar} />
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader isOpen={isOpen}>
          <Logo isOpen={isOpen}>Amancom</Logo>
          <ToggleButton onClick={toggleSidebar}>
            {isOpen ? <Close /> : <Menu />}
          </ToggleButton>
        </SidebarHeader>
        
        <NavMenu>
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavItem 
                key={item.path} 
                to={item.path} 
                active={isActive ? 1 : 0}
                isOpen={isOpen}
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    toggleSidebar();
                  }
                }}
              >
                <IconWrapper>
                  <Icon />
                </IconWrapper>
                <span>{item.label}</span>
              </NavItem>
            );
          })}
        </NavMenu>
      </SidebarContainer>
    </>
  );
};

export default Sidebar; 