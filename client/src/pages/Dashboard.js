import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  People, 
  PhoneAndroid, 
  SimCard, 
  Subscriptions,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle
} from '@mui/icons-material';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const DateDisplay = styled.div`
  color: #666;
  font-size: 14px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid ${props => props.color};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StatTitle = styled.h3`
  font-size: 14px;
  color: #666;
  margin: 0;
  font-weight: 500;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor};
  color: white;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${props => props.isPositive ? '#22c55e' : '#ef4444'};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
`;

const ActivitySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: ${props => props.bgColor || '#f8f9fa'};
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor};
  color: white;
  font-size: 14px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: #666;
`;

const PlaceholderChart = styled.div`
  height: 300px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 16px;
`;

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeDevices: 0,
    totalSims: 0,
    expiringSubscriptions: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      // Mock data - replace with actual API calls
      setStats({
        totalClients: 156,
        activeDevices: 234,
        totalSims: 189,
        expiringSubscriptions: 12
      });

      setRecentActivity([
        {
          id: 1,
          type: 'device',
          title: 'Device disconnected',
          description: 'GPS device #DEV-001 disconnected',
          time: '2 minutes ago',
          icon: 'warning',
          color: '#f59e0b'
        },
        {
          id: 2,
          type: 'subscription',
          title: 'Subscription renewed',
          description: 'Client ABC Corp renewed monthly plan',
          time: '15 minutes ago',
          icon: 'success',
          color: '#10b981'
        },
        {
          id: 3,
          type: 'client',
          title: 'New client registered',
          description: 'XYZ Logistics joined the platform',
          time: '1 hour ago',
          icon: 'info',
          color: '#3b82f6'
        },
        {
          id: 4,
          type: 'sim',
          title: 'SIM card activated',
          description: 'SIM #SIM-045 activated for device #DEV-023',
          time: '2 hours ago',
          icon: 'success',
          color: '#10b981'
        }
      ]);
    };

    fetchDashboardData();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'warning':
        return <Warning />;
      case 'success':
        return <CheckCircle />;
      case 'info':
        return <People />;
      default:
        return <CheckCircle />;
    }
  };

  return (
    <DashboardContainer>
      <PageHeader>
        <div>
          <PageTitle>Dashboard</PageTitle>
          <DateDisplay>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</DateDisplay>
        </div>
      </PageHeader>

      <StatsGrid>
        <StatCard color="#3b82f6">
          <StatHeader>
            <StatTitle>Total Clients</StatTitle>
            <StatIcon bgColor="#3b82f6">
              <People />
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.totalClients}</StatValue>
          <StatChange isPositive={true}>
            <TrendingUp style={{ fontSize: 16 }} />
            +12% from last month
          </StatChange>
        </StatCard>

        <StatCard color="#10b981">
          <StatHeader>
            <StatTitle>Active Devices</StatTitle>
            <StatIcon bgColor="#10b981">
              <PhoneAndroid />
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.activeDevices}</StatValue>
          <StatChange isPositive={true}>
            <TrendingUp style={{ fontSize: 16 }} />
            +8% from last week
          </StatChange>
        </StatCard>

        <StatCard color="#f59e0b">
          <StatHeader>
            <StatTitle>Total SIMs</StatTitle>
            <StatIcon bgColor="#f59e0b">
              <SimCard />
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.totalSims}</StatValue>
          <StatChange isPositive={false}>
            <TrendingDown style={{ fontSize: 16 }} />
            -3% from last month
          </StatChange>
        </StatCard>

        <StatCard color="#ef4444">
          <StatHeader>
            <StatTitle>Expiring Subscriptions</StatTitle>
            <StatIcon bgColor="#ef4444">
              <Subscriptions />
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.expiringSubscriptions}</StatValue>
          <StatChange isPositive={false}>
            <Warning style={{ fontSize: 16 }} />
            Requires attention
          </StatChange>
        </StatCard>
      </StatsGrid>

      <ContentGrid>
        <ChartSection>
          <SectionTitle>Device Activity Overview</SectionTitle>
          <PlaceholderChart>
            Chart Component - Device Activity Over Time
          </PlaceholderChart>
        </ChartSection>

        <ActivitySection>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityList>
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} bgColor={activity.color + '10'}>
                <ActivityIcon bgColor={activity.color}>
                  {getActivityIcon(activity.icon)}
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityTime>{activity.description} • {activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </ActivityList>
        </ActivitySection>
      </ContentGrid>
    </DashboardContainer>
  );
};

export default Dashboard; 