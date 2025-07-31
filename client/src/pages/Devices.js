import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Add, 
  Search, 
  FilterList, 
  Edit, 
  Delete, 
  Visibility,
  LocationOn,
  SignalCellular4Bar,
  SignalCellular0Bar,
  Battery90,
  Battery20,
  Assignment
} from '@mui/icons-material';

const DevicesContainer = styled.div`
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

const DevicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DeviceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  border-left: 4px solid ${props => props.status === 'online' ? '#10b981' : props.status === 'offline' ? '#ef4444' : '#f59e0b'};

  &:hover {
    transform: translateY(-2px);
  }
`;

const DeviceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const DeviceInfo = styled.div`
  flex: 1;
`;

const DeviceName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const DeviceId = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-family: monospace;
`;

const DeviceStatus = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'online': return '#dcfce7';
      case 'offline': return '#fee2e2';
      case 'maintenance': return '#fef3c7';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'online': return '#166534';
      case 'offline': return '#dc2626';
      case 'maintenance': return '#92400e';
      default: return '#6b7280';
    }
  }};
`;

const DeviceDetails = styled.div`
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

const DeviceStats = styled.div`
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
`;

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch devices
    const fetchDevices = async () => {
      // Mock data - replace with actual API calls
      const mockDevices = [
        {
          id: 1,
          name: 'GPS Tracker #001',
          deviceId: 'DEV-001-ABC123',
          status: 'online',
          location: 'New York, NY',
          assignedTo: 'John Smith',
          battery: 85,
          signal: 'strong',
          lastSeen: '2 minutes ago',
          client: 'ABC Logistics'
        },
        {
          id: 2,
          name: 'GPS Tracker #002',
          deviceId: 'DEV-002-DEF456',
          status: 'offline',
          location: 'Los Angeles, CA',
          assignedTo: 'Sarah Johnson',
          battery: 15,
          signal: 'weak',
          lastSeen: '1 hour ago',
          client: 'XYZ Transport'
        },
        {
          id: 3,
          name: 'GPS Tracker #003',
          deviceId: 'DEV-003-GHI789',
          status: 'maintenance',
          location: 'Chicago, IL',
          assignedTo: 'Mike Wilson',
          battery: 60,
          signal: 'medium',
          lastSeen: '30 minutes ago',
          client: 'FastTrack Delivery'
        }
      ];

      setDevices(mockDevices);
      setLoading(false);
    };

    fetchDevices();
  }, []);

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'strong':
        return <SignalCellular4Bar style={{ color: '#10b981' }} />;
      case 'medium':
        return <SignalCellular4Bar style={{ color: '#f59e0b' }} />;
      case 'weak':
        return <SignalCellular0Bar style={{ color: '#ef4444' }} />;
      default:
        return <SignalCellular0Bar style={{ color: '#999' }} />;
    }
  };

  const getBatteryIcon = (battery) => {
    if (battery > 80) return <Battery90 style={{ color: '#10b981' }} />;
    if (battery > 50) return <Battery90 style={{ color: '#f59e0b' }} />;
    return <Battery20 style={{ color: '#ef4444' }} />;
  };

  const handleAddDevice = () => {
    console.log('Add device clicked');
  };

  const handleEditDevice = (deviceId) => {
    console.log('Edit device:', deviceId);
  };

  const handleDeleteDevice = (deviceId) => {
    console.log('Delete device:', deviceId);
  };

  const handleViewDevice = (deviceId) => {
    console.log('View device:', deviceId);
  };

  const handleAssignDevice = (deviceId) => {
    console.log('Assign device:', deviceId);
  };

  if (loading) {
    return <div>Loading devices...</div>;
  }

  return (
    <DevicesContainer>
      <PageHeader>
        <PageTitle>Devices</PageTitle>
        <HeaderActions>
          <AddButton onClick={handleAddDevice}>
            <Add />
            Add Device
          </AddButton>
        </HeaderActions>
      </PageHeader>

      <SearchFilterContainer>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search devices by name, ID, or assigned user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <FilterButton>
          <FilterList />
          Filter
        </FilterButton>
      </SearchFilterContainer>

      <DevicesGrid>
        {filteredDevices.map((device) => (
          <DeviceCard key={device.id} status={device.status}>
            <DeviceHeader>
              <DeviceInfo>
                <DeviceName>{device.name}</DeviceName>
                <DeviceId>{device.deviceId}</DeviceId>
                <DeviceStatus status={device.status}>
                  {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                </DeviceStatus>
              </DeviceInfo>
            </DeviceHeader>

            <DeviceDetails>
              <DetailItem>
                <LocationOn style={{ fontSize: 16, color: '#999' }} />
                {device.location}
              </DetailItem>
              <DetailItem>
                <Assignment style={{ fontSize: 16, color: '#999' }} />
                {device.assignedTo} ({device.client})
              </DetailItem>
              <DetailItem>
                Last seen: {device.lastSeen}
              </DetailItem>
            </DeviceDetails>

            <DeviceStats>
              <StatItem>
                <StatValue>
                  {getBatteryIcon(device.battery)}
                  {device.battery}%
                </StatValue>
                <StatLabel>Battery</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  {getSignalIcon(device.signal)}
                  {device.signal}
                </StatValue>
                <StatLabel>Signal</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <LocationOn style={{ fontSize: 16, color: '#999' }} />
                  Active
                </StatValue>
                <StatLabel>Tracking</StatLabel>
              </StatItem>
            </DeviceStats>

            <CardActions>
              <ActionButton onClick={() => handleViewDevice(device.id)}>
                <Visibility />
                View
              </ActionButton>
              <ActionButton onClick={() => handleAssignDevice(device.id)}>
                <Assignment />
                Assign
              </ActionButton>
              <ActionButton onClick={() => handleEditDevice(device.id)}>
                <Edit />
                Edit
              </ActionButton>
              <ActionButton 
                className="danger" 
                onClick={() => handleDeleteDevice(device.id)}
              >
                <Delete />
                Delete
              </ActionButton>
            </CardActions>
          </DeviceCard>
        ))}
      </DevicesGrid>
    </DevicesContainer>
  );
};

export default Devices; 