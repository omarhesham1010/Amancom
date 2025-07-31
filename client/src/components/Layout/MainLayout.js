import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: ${props => props.sidebarOpen ? '250px' : '60px'};
  margin-top: 70px;
  padding: 20px;
  background: #f8f9fa;
  min-height: calc(100vh - 70px);
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 15px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MainLayout = ({ children, userRole = 'Admin' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        userRole={userRole}
      />
      <div style={{ flex: 1 }}>
        <TopNavbar 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar}
          user={{ name: 'Admin User', role: userRole }}
        />
        <MainContent sidebarOpen={sidebarOpen}>
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </MainContent>
      </div>
    </LayoutContainer>
  );
};

export default MainLayout; 