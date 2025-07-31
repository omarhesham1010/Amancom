import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Add, 
  Search, 
  FilterList, 
  Edit, 
  Delete, 
  Visibility,
  Subscriptions as SubscriptionsIcon,
  Warning,
  CheckCircle,
  Schedule,
  Payment
} from '@mui/icons-material';

const SubscriptionsContainer = styled.div`
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

const SubscriptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SubscriptionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  border-left: 4px solid ${props => {
    if (props.status === 'active') return '#10b981';
    if (props.status === 'expired') return '#ef4444';
    if (props.status === 'pending') return '#f59e0b';
    return '#6b7280';
  }};

  &:hover {
    transform: translateY(-2px);
  }
`;

const SubscriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const SubscriptionInfo = styled.div`
  flex: 1;
`;

const PlanName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const ClientName = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const SubscriptionStatus = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'active': return '#dcfce7';
      case 'expired': return '#fee2e2';
      case 'pending': return '#fef3c7';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active': return '#166534';
      case 'expired': return '#dc2626';
      case 'pending': return '#92400e';
      default: return '#6b7280';
    }
  }};
`;

const SubscriptionDetails = styled.div`
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

const SubscriptionStats = styled.div`
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

  &.renew:hover {
    border-color: #10b981;
    color: #10b981;
  }
`;

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch subscriptions
    const fetchSubscriptions = async () => {
      // Mock data - replace with actual API calls
      const mockSubscriptions = [
        {
          id: 1,
          planName: 'Premium GPS Tracking',
          client: 'ABC Logistics',
          status: 'active',
          price: 99.99,
          billingCycle: 'monthly',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          devices: 5,
          features: ['Real-time tracking', 'Geofencing', 'Reports'],
          autoRenew: true,
          lastPayment: '2024-01-15'
        },
        {
          id: 2,
          planName: 'Basic GPS Tracking',
          client: 'XYZ Transport',
          status: 'expired',
          price: 49.99,
          billingCycle: 'monthly',
          startDate: '2023-12-01',
          endDate: '2024-01-31',
          devices: 12,
          features: ['Real-time tracking', 'Basic reports'],
          autoRenew: false,
          lastPayment: '2023-12-15'
        },
        {
          id: 3,
          planName: 'Enterprise GPS Tracking',
          client: 'FastTrack Delivery',
          status: 'pending',
          price: 199.99,
          billingCycle: 'yearly',
          startDate: '2024-02-01',
          endDate: '2025-01-31',
          devices: 25,
          features: ['Real-time tracking', 'Geofencing', 'Advanced reports', 'API access'],
          autoRenew: true,
          lastPayment: '2024-02-01'
        }
      ];

      setSubscriptions(mockSubscriptions);
      setLoading(false);
    };

    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter(subscription =>
    subscription.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle style={{ color: '#10b981' }} />;
      case 'expired':
        return <Warning style={{ color: '#ef4444' }} />;
      case 'pending':
        return <Schedule style={{ color: '#f59e0b' }} />;
      default:
        return <SubscriptionsIcon style={{ color: '#999' }} />;
    }
  };

  const isExpiringSoon = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const handleAddSubscription = () => {
    console.log('Add subscription clicked');
  };

  const handleEditSubscription = (subscriptionId) => {
    console.log('Edit subscription:', subscriptionId);
  };

  const handleDeleteSubscription = (subscriptionId) => {
    console.log('Delete subscription:', subscriptionId);
  };

  const handleViewSubscription = (subscriptionId) => {
    console.log('View subscription:', subscriptionId);
  };

  const handleRenewSubscription = (subscriptionId) => {
    console.log('Renew subscription:', subscriptionId);
  };

  if (loading) {
    return <div>Loading subscriptions...</div>;
  }

  return (
    <SubscriptionsContainer>
      <PageHeader>
        <PageTitle>Subscriptions</PageTitle>
        <HeaderActions>
          <AddButton onClick={handleAddSubscription}>
            <Add />
            Add Subscription
          </AddButton>
        </HeaderActions>
      </PageHeader>

      <SearchFilterContainer>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search subscriptions by plan name or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <FilterButton>
          <FilterList />
          Filter
        </FilterButton>
      </SearchFilterContainer>

      <SubscriptionsGrid>
        {filteredSubscriptions.map((subscription) => (
          <SubscriptionCard key={subscription.id} status={subscription.status}>
            <SubscriptionHeader>
              <SubscriptionInfo>
                <PlanName>{subscription.planName}</PlanName>
                <ClientName>{subscription.client}</ClientName>
                <SubscriptionStatus status={subscription.status}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  {isExpiringSoon(subscription.endDate) && ' (Expiring Soon)'}
                </SubscriptionStatus>
              </SubscriptionInfo>
            </SubscriptionHeader>

            <SubscriptionDetails>
              <DetailItem>
                <Payment style={{ fontSize: 16, color: '#999' }} />
                ${subscription.price}/{subscription.billingCycle}
              </DetailItem>
              <DetailItem>
                <SubscriptionsIcon style={{ fontSize: 16, color: '#999' }} />
                {subscription.devices} devices
              </DetailItem>
              <DetailItem>
                <Schedule style={{ fontSize: 16, color: '#999' }} />
                {new Date(subscription.startDate).toLocaleDateString()} - {new Date(subscription.endDate).toLocaleDateString()}
              </DetailItem>
            </SubscriptionDetails>

            <SubscriptionStats>
              <StatItem>
                <StatValue>
                  {getStatusIcon(subscription.status)}
                  {subscription.status}
                </StatValue>
                <StatLabel>Status</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <Payment style={{ fontSize: 16, color: '#999' }} />
                  {new Date(subscription.lastPayment).toLocaleDateString()}
                </StatValue>
                <StatLabel>Last Payment</StatLabel>
              </StatItem>
            </SubscriptionStats>

            <CardActions>
              <ActionButton onClick={() => handleViewSubscription(subscription.id)}>
                <Visibility />
                View
              </ActionButton>
              {subscription.status === 'expired' && (
                <ActionButton 
                  className="renew" 
                  onClick={() => handleRenewSubscription(subscription.id)}
                >
                  <Payment />
                  Renew
                </ActionButton>
              )}
              <ActionButton onClick={() => handleEditSubscription(subscription.id)}>
                <Edit />
                Edit
              </ActionButton>
              <ActionButton 
                className="danger" 
                onClick={() => handleDeleteSubscription(subscription.id)}
              >
                <Delete />
                Delete
              </ActionButton>
            </CardActions>
          </SubscriptionCard>
        ))}
      </SubscriptionsGrid>
    </SubscriptionsContainer>
  );
};

export default Subscriptions; 