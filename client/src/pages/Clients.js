import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Add, 
  Search, 
  FilterList, 
  Edit, 
  Delete, 
  Visibility,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';

const ClientsContainer = styled.div`
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

const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ClientCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ClientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ClientInfo = styled.div`
  flex: 1;
`;

const ClientName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const ClientCompany = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const ClientStatus = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.status === 'active' ? '#dcfce7' : '#fef3c7'};
  color: ${props => props.status === 'active' ? '#166534' : '#92400e'};
`;

const ClientDetails = styled.div`
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

const ClientStats = styled.div`
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
  font-size: 20px;
  font-weight: 600;
  color: #333;
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
`;

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch clients
    const fetchClients = async () => {
      // Mock data - replace with actual API calls
      const mockClients = [
        {
          id: 1,
          name: 'John Smith',
          company: 'ABC Logistics',
          email: 'john@abclogistics.com',
          phone: '+1 (555) 123-4567',
          location: 'New York, NY',
          status: 'active',
          devices: 5,
          subscriptions: 3,
          joinedDate: '2023-01-15'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          company: 'XYZ Transport',
          email: 'sarah@xyztransport.com',
          phone: '+1 (555) 987-6543',
          location: 'Los Angeles, CA',
          status: 'active',
          devices: 12,
          subscriptions: 8,
          joinedDate: '2022-11-20'
        },
        {
          id: 3,
          name: 'Mike Wilson',
          company: 'FastTrack Delivery',
          email: 'mike@fasttrack.com',
          phone: '+1 (555) 456-7890',
          location: 'Chicago, IL',
          status: 'inactive',
          devices: 3,
          subscriptions: 2,
          joinedDate: '2023-03-10'
        }
      ];

      setClients(mockClients);
      setLoading(false);
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    // Handle add client logic
    console.log('Add client clicked');
  };

  const handleEditClient = (clientId) => {
    // Handle edit client logic
    console.log('Edit client:', clientId);
  };

  const handleDeleteClient = (clientId) => {
    // Handle delete client logic
    console.log('Delete client:', clientId);
  };

  const handleViewClient = (clientId) => {
    // Handle view client logic
    console.log('View client:', clientId);
  };

  if (loading) {
    return <div>Loading clients...</div>;
  }

  return (
    <ClientsContainer>
      <PageHeader>
        <PageTitle>Clients</PageTitle>
        <HeaderActions>
          <AddButton onClick={handleAddClient}>
            <Add />
            Add Client
          </AddButton>
        </HeaderActions>
      </PageHeader>

      <SearchFilterContainer>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search clients by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <FilterButton>
          <FilterList />
          Filter
        </FilterButton>
      </SearchFilterContainer>

      <ClientsGrid>
        {filteredClients.map((client) => (
          <ClientCard key={client.id}>
            <ClientHeader>
              <ClientInfo>
                <ClientName>{client.name}</ClientName>
                <ClientCompany>{client.company}</ClientCompany>
                <ClientStatus status={client.status}>
                  {client.status === 'active' ? 'Active' : 'Inactive'}
                </ClientStatus>
              </ClientInfo>
            </ClientHeader>

            <ClientDetails>
              <DetailItem>
                <Email style={{ fontSize: 16, color: '#999' }} />
                {client.email}
              </DetailItem>
              <DetailItem>
                <Phone style={{ fontSize: 16, color: '#999' }} />
                {client.phone}
              </DetailItem>
              <DetailItem>
                <LocationOn style={{ fontSize: 16, color: '#999' }} />
                {client.location}
              </DetailItem>
            </ClientDetails>

            <ClientStats>
              <StatItem>
                <StatValue>{client.devices}</StatValue>
                <StatLabel>Devices</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{client.subscriptions}</StatValue>
                <StatLabel>Subscriptions</StatLabel>
              </StatItem>
            </ClientStats>

            <CardActions>
              <ActionButton onClick={() => handleViewClient(client.id)}>
                <Visibility />
                View
              </ActionButton>
              <ActionButton onClick={() => handleEditClient(client.id)}>
                <Edit />
                Edit
              </ActionButton>
              <ActionButton 
                className="danger" 
                onClick={() => handleDeleteClient(client.id)}
              >
                <Delete />
                Delete
              </ActionButton>
            </CardActions>
          </ClientCard>
        ))}
      </ClientsGrid>
    </ClientsContainer>
  );
};

export default Clients; 