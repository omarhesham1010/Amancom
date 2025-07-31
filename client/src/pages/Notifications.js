import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Add, 
  Search, 
  FilterList, 
  Edit, 
  Delete, 
  Visibility,
  Notifications as NotificationsIcon,
  Warning,
  CheckCircle,
  Info,
  Schedule,
  Send
} from '@mui/icons-material';

const NotificationsContainer = styled.div`
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

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const SearchFilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #667eea;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const FilterButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    color: #667eea;
  }
`;

const NotificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NotificationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'alert': return '#ef4444';
      case 'info': return '#3b82f6';
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      default: return '#6b7280';
    }
  }};

  &:hover {
    transform: translateY(-2px);
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const NotificationInfo = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const NotificationType = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const NotificationStatus = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'read': return '#dcfce7';
      case 'unread': return '#fee2e2';
      case 'sent': return '#dbeafe';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'read': return '#166534';
      case 'unread': return '#dc2626';
      case 'sent': return '#1d4ed8';
      default: return '#6b7280';
    }
  }};
`;

const NotificationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

const NotificationMessage = styled.div`
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const NotificationStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    color: #667eea;
  }

  &.danger:hover {
    border-color: #ef4444;
    color: #ef4444;
  }

  &.send:hover {
    border-color: #10b981;
    color: #10b981;
  }
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch notifications
    const fetchNotifications = async () => {
      // Mock data - replace with actual API calls
      const mockNotifications = [
        {
          id: 1,
          title: 'Device Disconnection Alert',
          type: 'alert',
          status: 'unread',
          message: 'GPS device #DEV-001 has been disconnected for more than 30 minutes. Please check the device status.',
          recipient: 'All Administrators',
          sentAt: '2024-01-20T10:30:00Z',
          priority: 'high',
          category: 'Device Monitoring'
        },
        {
          id: 2,
          title: 'Subscription Renewal Reminder',
          type: 'warning',
          status: 'read',
          message: 'Subscription for ABC Logistics will expire in 7 days. Please contact the client for renewal.',
          recipient: 'Sales Team',
          sentAt: '2024-01-19T14:15:00Z',
          priority: 'medium',
          category: 'Billing'
        },
        {
          id: 3,
          title: 'System Maintenance Complete',
          type: 'success',
          status: 'sent',
          message: 'Scheduled system maintenance has been completed successfully. All services are now operational.',
          recipient: 'All Users',
          sentAt: '2024-01-18T08:00:00Z',
          priority: 'low',
          category: 'System'
        },
        {
          id: 4,
          title: 'New Client Registration',
          type: 'info',
          status: 'unread',
          message: 'New client "FastTrack Delivery" has registered and requires account activation.',
          recipient: 'Admin Team',
          sentAt: '2024-01-20T09:45:00Z',
          priority: 'medium',
          category: 'Client Management'
        }
      ];

      setNotifications(mockNotifications);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'alert':
        return <Warning style={{ color: '#ef4444' }} />;
      case 'info':
        return <Info style={{ color: '#3b82f6' }} />;
      case 'success':
        return <CheckCircle style={{ color: '#10b981' }} />;
      case 'warning':
        return <Warning style={{ color: '#f59e0b' }} />;
      default:
        return <NotificationsIcon style={{ color: '#999' }} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleAddNotification = () => {
    console.log('Add notification clicked');
  };

  const handleEditNotification = (notificationId) => {
    console.log('Edit notification:', notificationId);
  };

  const handleDeleteNotification = (notificationId) => {
    console.log('Delete notification:', notificationId);
  };

  const handleViewNotification = (notificationId) => {
    console.log('View notification:', notificationId);
  };

  const handleSendNotification = (notificationId) => {
    console.log('Send notification:', notificationId);
  };

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <NotificationsContainer>
      <PageHeader>
        <PageTitle>Notifications</PageTitle>
        <HeaderActions>
          <AddButton onClick={handleAddNotification}>
            <Add />
            Send Notification
          </AddButton>
        </HeaderActions>
      </PageHeader>

      <SearchFilterContainer>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search notifications by title, message, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <FilterButton>
          <FilterList />
          Filter
        </FilterButton>
      </SearchFilterContainer>

      <NotificationsGrid>
        {filteredNotifications.map((notification) => (
          <NotificationCard key={notification.id} type={notification.type}>
            <NotificationHeader>
              <NotificationInfo>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationType>{notification.category}</NotificationType>
                <NotificationStatus status={notification.status}>
                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                </NotificationStatus>
              </NotificationInfo>
            </NotificationHeader>

            <NotificationMessage>
              {notification.message}
            </NotificationMessage>

            <NotificationDetails>
              <DetailItem>
                <Send style={{ fontSize: 16, color: '#999' }} />
                To: {notification.recipient}
              </DetailItem>
              <DetailItem>
                <Schedule style={{ fontSize: 16, color: '#999' }} />
                {formatDate(notification.sentAt)}
              </DetailItem>
              <DetailItem>
                Priority: {notification.priority}
              </DetailItem>
            </NotificationDetails>

            <NotificationStats>
              <StatItem>
                <StatValue>
                  {getTypeIcon(notification.type)}
                  {notification.type}
                </StatValue>
                <StatLabel>Type</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <Notifications style={{ fontSize: 16, color: '#999' }} />
                  {notification.priority}
                </StatValue>
                <StatLabel>Priority</StatLabel>
              </StatItem>
            </NotificationStats>

            <CardActions>
              <ActionButton onClick={() => handleViewNotification(notification.id)}>
                <Visibility />
                View
              </ActionButton>
              {notification.status === 'unread' && (
                <ActionButton 
                  className="send" 
                  onClick={() => handleSendNotification(notification.id)}
                >
                  <Send />
                  Send
                </ActionButton>
              )}
              <ActionButton onClick={() => handleEditNotification(notification.id)}>
                <Edit />
                Edit
              </ActionButton>
              <ActionButton 
                className="danger" 
                onClick={() => handleDeleteNotification(notification.id)}
              >
                <Delete />
                Delete
              </ActionButton>
            </CardActions>
          </NotificationCard>
        ))}
      </NotificationsGrid>
    </NotificationsContainer>
  );
};

export default Notifications; 