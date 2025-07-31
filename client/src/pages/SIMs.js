import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Add, 
  Search, 
  FilterList, 
  Edit, 
  Delete, 
  Visibility,
  SimCard,
  SignalCellular4Bar,
  SignalCellular0Bar,
  DataUsage,
  Recharge
} from '@mui/icons-material';

const SIMsContainer = styled.div`
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

const SIMsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SIMCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  border-left: 4px solid ${props => props.status === 'active' ? '#10b981' : props.status === 'suspended' ? '#ef4444' : '#f59e0b'};

  &:hover {
    transform: translateY(-2px);
  }
`;

const SIMHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const SIMInfo = styled.div`
  flex: 1;
`;

const SIMName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const SIMNumber = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-family: monospace;
`;

const SIMStatus = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'active': return '#dcfce7';
      case 'suspended': return '#fee2e2';
      case 'expired': return '#fef3c7';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active': return '#166534';
      case 'suspended': return '#dc2626';
      case 'expired': return '#92400e';
      default: return '#6b7280';
    }
  }};
`;

const SIMDetails = styled.div`
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

const SIMStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

  &.recharge:hover {
    border-color: #10b981;
    color: #10b981;
  }
`;

const SIMs = () => {
  const [sims, setSims] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch SIMs
    const fetchSIMs = async () => {
      // Mock data - replace with actual API calls
      const mockSIMs = [
        {
          id: 1,
          name: 'SIM Card #001',
          simNumber: '+1-555-123-4567',
          status: 'active',
          carrier: 'AT&T',
          dataUsage: 2.5,
          dataLimit: 10,
          assignedTo: 'GPS Tracker #001',
          client: 'ABC Logistics',
          expiryDate: '2024-12-31',
          lastRecharge: '2024-01-15'
        },
        {
          id: 2,
          name: 'SIM Card #002',
          simNumber: '+1-555-987-6543',
          status: 'suspended',
          carrier: 'Verizon',
          dataUsage: 8.2,
          dataLimit: 5,
          assignedTo: 'GPS Tracker #002',
          client: 'XYZ Transport',
          expiryDate: '2024-06-30',
          lastRecharge: '2024-01-10'
        },
        {
          id: 3,
          name: 'SIM Card #003',
          simNumber: '+1-555-456-7890',
          status: 'active',
          carrier: 'T-Mobile',
          dataUsage: 1.8,
          dataLimit: 15,
          assignedTo: 'GPS Tracker #003',
          client: 'FastTrack Delivery',
          expiryDate: '2024-09-15',
          lastRecharge: '2024-01-20'
        }
      ];

      setSims(mockSIMs);
      setLoading(false);
    };

    fetchSIMs();
  }, []);

  const filteredSIMs = sims.filter(sim =>
    sim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sim.simNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sim.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSignalIcon = (status) => {
    switch (status) {
      case 'active':
        return <SignalCellular4Bar style={{ color: '#10b981' }} />;
      case 'suspended':
        return <SignalCellular0Bar style={{ color: '#ef4444' }} />;
      default:
        return <SignalCellular0Bar style={{ color: '#f59e0b' }} />;
    }
  };

  const getDataUsageColor = (usage, limit) => {
    const percentage = (usage / limit) * 100;
    if (percentage > 80) return '#ef4444';
    if (percentage > 60) return '#f59e0b';
    return '#10b981';
  };

  const handleAddSIM = () => {
    console.log('Add SIM clicked');
  };

  const handleEditSIM = (simId) => {
    console.log('Edit SIM:', simId);
  };

  const handleDeleteSIM = (simId) => {
    console.log('Delete SIM:', simId);
  };

  const handleViewSIM = (simId) => {
    console.log('View SIM:', simId);
  };

  const handleRechargeSIM = (simId) => {
    console.log('Recharge SIM:', simId);
  };

  if (loading) {
    return <div>Loading SIMs...</div>;
  }

  return (
    <SIMsContainer>
      <PageHeader>
        <PageTitle>SIM Cards</PageTitle>
        <HeaderActions>
          <AddButton onClick={handleAddSIM}>
            <Add />
            Add SIM
          </AddButton>
        </HeaderActions>
      </PageHeader>

      <SearchFilterContainer>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search SIMs by name, number, or assigned device..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <FilterButton>
          <FilterList />
          Filter
        </FilterButton>
      </SearchFilterContainer>

      <SIMsGrid>
        {filteredSIMs.map((sim) => (
          <SIMCard key={sim.id} status={sim.status}>
            <SIMHeader>
              <SIMInfo>
                <SIMName>{sim.name}</SIMName>
                <SIMNumber>{sim.simNumber}</SIMNumber>
                <SIMStatus status={sim.status}>
                  {sim.status.charAt(0).toUpperCase() + sim.status.slice(1)}
                </SIMStatus>
              </SIMInfo>
            </SIMHeader>

            <SIMDetails>
              <DetailItem>
                <SimCard style={{ fontSize: 16, color: '#999' }} />
                {sim.carrier}
              </DetailItem>
              <DetailItem>
                <DataUsage style={{ fontSize: 16, color: '#999' }} />
                {sim.assignedTo} ({sim.client})
              </DetailItem>
              <DetailItem>
                Expires: {new Date(sim.expiryDate).toLocaleDateString()}
              </DetailItem>
            </SIMDetails>

            <SIMStats>
              <StatItem>
                <StatValue>
                  {getSignalIcon(sim.status)}
                  {sim.status}
                </StatValue>
                <StatLabel>Status</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue style={{ color: getDataUsageColor(sim.dataUsage, sim.dataLimit) }}>
                  {sim.dataUsage}GB / {sim.dataLimit}GB
                </StatValue>
                <StatLabel>Data Usage</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <Recharge style={{ fontSize: 16, color: '#999' }} />
                  {new Date(sim.lastRecharge).toLocaleDateString()}
                </StatValue>
                <StatLabel>Last Recharge</StatLabel>
              </StatItem>
            </SIMStats>

            <CardActions>
              <ActionButton onClick={() => handleViewSIM(sim.id)}>
                <Visibility />
                View
              </ActionButton>
              <ActionButton 
                className="recharge" 
                onClick={() => handleRechargeSIM(sim.id)}
              >
                <Recharge />
                Recharge
              </ActionButton>
              <ActionButton onClick={() => handleEditSIM(sim.id)}>
                <Edit />
                Edit
              </ActionButton>
              <ActionButton 
                className="danger" 
                onClick={() => handleDeleteSIM(sim.id)}
              >
                <Delete />
                Delete
              </ActionButton>
            </CardActions>
          </SIMCard>
        ))}
      </SIMsGrid>
    </SIMsContainer>
  );
};

export default SIMs; 