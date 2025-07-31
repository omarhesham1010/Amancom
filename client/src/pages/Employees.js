import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Add, 
  Search, 
  FilterList, 
  Edit, 
  Delete, 
  Visibility,
  Person,
  AdminPanelSettings,
  Support,
  Security,
  Email,
  Phone
} from '@mui/icons-material';

const EmployeesContainer = styled.div`
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

const EmployeesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmployeeCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  border-left: 4px solid ${props => {
    switch (props.role) {
      case 'Owner': return '#ef4444';
      case 'Admin': return '#3b82f6';
      case 'Support': return '#10b981';
      default: return '#6b7280';
    }
  }};

  &:hover {
    transform: translateY(-2px);
  }
`;

const EmployeeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const EmployeeInfo = styled.div`
  flex: 1;
`;

const EmployeeName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const EmployeeUsername = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-family: monospace;
`;

const EmployeeRole = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.role) {
      case 'Owner': return '#fee2e2';
      case 'Admin': return '#dbeafe';
      case 'Support': return '#dcfce7';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.role) {
      case 'Owner': return '#dc2626';
      case 'Admin': return '#1d4ed8';
      case 'Support': return '#166534';
      default: return '#6b7280';
    }
  }};
`;

const EmployeeDetails = styled.div`
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

const EmployeeStats = styled.div`
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
`;

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch employees
    const fetchEmployees = async () => {
      // Mock data - replace with actual API calls
      const mockEmployees = [
        {
          id: 1,
          name: 'John Admin',
          username: 'john.admin',
          email: 'john@amancom.com',
          phone: '+1 (555) 123-4567',
          role: 'Admin',
          permissions: ['can_add_clients', 'can_add_devices', 'can_view_reports'],
          lastLogin: '2024-01-20T10:30:00Z',
          status: 'active',
          clientsManaged: 15,
          devicesManaged: 45
        },
        {
          id: 2,
          name: 'Sarah Support',
          username: 'sarah.support',
          email: 'sarah@amancom.com',
          phone: '+1 (555) 987-6543',
          role: 'Support',
          permissions: ['can_view_clients', 'can_view_devices'],
          lastLogin: '2024-01-19T14:15:00Z',
          status: 'active',
          clientsManaged: 8,
          devicesManaged: 23
        },
        {
          id: 3,
          name: 'Mike Owner',
          username: 'mike.owner',
          email: 'mike@amancom.com',
          phone: '+1 (555) 456-7890',
          role: 'Owner',
          permissions: ['can_add_clients', 'can_add_devices', 'can_add_employees', 'can_view_reports', 'can_manage_system'],
          lastLogin: '2024-01-20T09:45:00Z',
          status: 'active',
          clientsManaged: 25,
          devicesManaged: 78
        }
      ];

      setEmployees(mockEmployees);
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Owner':
        return <AdminPanelSettings style={{ color: '#ef4444' }} />;
      case 'Admin':
        return <Security style={{ color: '#3b82f6' }} />;
      case 'Support':
        return <Support style={{ color: '#10b981' }} />;
      default:
        return <Person style={{ color: '#999' }} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleAddEmployee = () => {
    console.log('Add employee clicked');
  };

  const handleEditEmployee = (employeeId) => {
    console.log('Edit employee:', employeeId);
  };

  const handleDeleteEmployee = (employeeId) => {
    console.log('Delete employee:', employeeId);
  };

  const handleViewEmployee = (employeeId) => {
    console.log('View employee:', employeeId);
  };

  if (loading) {
    return <div>Loading employees...</div>;
  }

  return (
    <EmployeesContainer>
      <PageHeader>
        <PageTitle>Employees</PageTitle>
        <HeaderActions>
          <AddButton onClick={handleAddEmployee}>
            <Add />
            Add Employee
          </AddButton>
        </HeaderActions>
      </PageHeader>

      <SearchFilterContainer>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            placeholder="Search employees by name, username, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <FilterButton>
          <FilterList />
          Filter
        </FilterButton>
      </SearchFilterContainer>

      <EmployeesGrid>
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} role={employee.role}>
            <EmployeeHeader>
              <EmployeeInfo>
                <EmployeeName>{employee.name}</EmployeeName>
                <EmployeeUsername>@{employee.username}</EmployeeUsername>
                <EmployeeRole role={employee.role}>
                  {employee.role}
                </EmployeeRole>
              </EmployeeInfo>
            </EmployeeHeader>

            <EmployeeDetails>
              <DetailItem>
                <Email style={{ fontSize: 16, color: '#999' }} />
                {employee.email}
              </DetailItem>
              <DetailItem>
                <Phone style={{ fontSize: 16, color: '#999' }} />
                {employee.phone}
              </DetailItem>
              <DetailItem>
                Last login: {formatDate(employee.lastLogin)}
              </DetailItem>
            </EmployeeDetails>

            <EmployeeStats>
              <StatItem>
                <StatValue>
                  {getRoleIcon(employee.role)}
                  {employee.role}
                </StatValue>
                <StatLabel>Role</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <Person style={{ fontSize: 16, color: '#999' }} />
                  {employee.clientsManaged} clients
                </StatValue>
                <StatLabel>Managed</StatLabel>
              </StatItem>
            </EmployeeStats>

            <CardActions>
              <ActionButton onClick={() => handleViewEmployee(employee.id)}>
                <Visibility />
                View
              </ActionButton>
              <ActionButton onClick={() => handleEditEmployee(employee.id)}>
                <Edit />
                Edit
              </ActionButton>
              <ActionButton 
                className="danger" 
                onClick={() => handleDeleteEmployee(employee.id)}
              >
                <Delete />
                Delete
              </ActionButton>
            </CardActions>
          </EmployeeCard>
        ))}
      </EmployeesGrid>
    </EmployeesContainer>
  );
};

export default Employees; 