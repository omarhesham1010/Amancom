import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Notifications, 
  AccountCircle, 
  Menu, 
  Search,
  KeyboardArrowDown
} from '@mui/icons-material';

const NavbarContainer = styled.div`
  height: 70px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  right: 0;
  left: ${props => props.sidebarOpen ? '250px' : '60px'};
  z-index: 999;
  transition: left 0.3s ease;

  @media (max-width: 768px) {
    left: 0;
    padding: 0 15px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  
  &:hover {
    background: #f5f5f5;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 12px 8px 40px;
  border: 1px solid #ddd;
  border-radius: 20px;
  width: 300px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #667eea;
  }

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  color: #999;
  font-size: 20px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  position: relative;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const UserRole = styled.span`
  font-size: 12px;
  color: #666;
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 200px;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TopNavbar = ({ sidebarOpen, toggleSidebar, user = { name: 'Admin User', role: 'Admin' } }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notificationCount] = useState(3);

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked');
    setShowProfileDropdown(false);
  };

  return (
    <NavbarContainer sidebarOpen={sidebarOpen}>
      <LeftSection>
        <MenuButton onClick={toggleSidebar}>
          <Menu />
        </MenuButton>
        
        <SearchContainer>
          <SearchIcon />
          <SearchInput placeholder="Search..." />
        </SearchContainer>
      </LeftSection>

      <RightSection>
        <NotificationButton>
          <Notifications />
          {notificationCount > 0 && (
            <NotificationBadge>{notificationCount}</NotificationBadge>
          )}
        </NotificationButton>

        <UserProfile onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
          <AccountCircle style={{ fontSize: 32, color: '#667eea' }} />
          <UserInfo>
            <UserName>{user.name}</UserName>
            <UserRole>{user.role}</UserRole>
          </UserInfo>
          <KeyboardArrowDown style={{ color: '#666' }} />
        </UserProfile>

        <ProfileDropdown isOpen={showProfileDropdown}>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </ProfileDropdown>
      </RightSection>
    </NavbarContainer>
  );
};

export default TopNavbar; 