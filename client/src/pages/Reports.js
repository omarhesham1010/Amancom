import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Assessment, 
  Download, 
  FilterList, 
  Visibility,
  TrendingUp,
  TrendingDown,
  CalendarToday,
  BarChart,
  PieChart,
  TableChart,
  FileDownload
} from '@mui/icons-material';

const ReportsContainer = styled.div`
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

const ExportButton = styled.button`
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

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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

  &.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const ReportCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ReportInfo = styled.div`
  flex: 1;
`;

const ReportTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
`;

const ReportDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const ReportType = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.type) {
      case 'analytics': return '#dcfce7';
      case 'activity': return '#dbeafe';
      case 'financial': return '#fef3c7';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'analytics': return '#166534';
      case 'activity': return '#1d4ed8';
      case 'financial': return '#92400e';
      default: return '#6b7280';
    }
  }};
`;

const ReportStats = styled.div`
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

  &.download:hover {
    border-color: #10b981;
    color: #10b981;
  }
`;

const ActivityLogSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
  border-left: 3px solid #667eea;
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #667eea;
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

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch reports
    const fetchReports = async () => {
      // Mock data - replace with actual API calls
      const mockReports = [
        {
          id: 1,
          title: 'Device Activity Report',
          description: 'Comprehensive analysis of device usage and performance',
          type: 'analytics',
          lastGenerated: '2024-01-20T10:30:00Z',
          records: 1250,
          fileSize: '2.5 MB',
          category: 'Device Monitoring'
        },
        {
          id: 2,
          title: 'Client Subscription Report',
          description: 'Monthly subscription status and renewal analysis',
          type: 'financial',
          lastGenerated: '2024-01-19T14:15:00Z',
          records: 89,
          fileSize: '1.2 MB',
          category: 'Billing'
        },
        {
          id: 3,
          title: 'System Activity Log',
          description: 'Detailed log of all system activities and user actions',
          type: 'activity',
          lastGenerated: '2024-01-20T09:45:00Z',
          records: 3420,
          fileSize: '4.8 MB',
          category: 'System'
        },
        {
          id: 4,
          title: 'Revenue Analytics',
          description: 'Monthly revenue breakdown and growth analysis',
          type: 'financial',
          lastGenerated: '2024-01-18T16:20:00Z',
          records: 156,
          fileSize: '3.1 MB',
          category: 'Financial'
        }
      ];

      setReports(mockReports);
      setLoading(false);
    };

    fetchReports();
  }, []);

  const filteredReports = selectedFilter === 'all' 
    ? reports 
    : reports.filter(report => report.type === selectedFilter);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'analytics':
        return <BarChart style={{ color: '#10b981' }} />;
      case 'financial':
        return <TrendingUp style={{ color: '#3b82f6' }} />;
      case 'activity':
        return <Assessment style={{ color: '#f59e0b' }} />;
      default:
        return <Assessment style={{ color: '#999' }} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleViewReport = (reportId) => {
    console.log('View report:', reportId);
  };

  const handleDownloadReport = (reportId) => {
    console.log('Download report:', reportId);
  };

  const handleExportAll = () => {
    console.log('Export all reports');
  };

  if (loading) {
    return <div>Loading reports...</div>;
  }

  return (
    <ReportsContainer>
      <PageHeader>
        <PageTitle>Reports</PageTitle>
        <HeaderActions>
          <ExportButton onClick={handleExportAll}>
            <FileDownload />
            Export All
          </ExportButton>
        </HeaderActions>
      </PageHeader>

      <FilterContainer>
        <FilterButton 
          className={selectedFilter === 'all' ? 'active' : ''}
          onClick={() => setSelectedFilter('all')}
        >
          <Assessment />
          All Reports
        </FilterButton>
        <FilterButton 
          className={selectedFilter === 'analytics' ? 'active' : ''}
          onClick={() => setSelectedFilter('analytics')}
        >
          <BarChart />
          Analytics
        </FilterButton>
        <FilterButton 
          className={selectedFilter === 'financial' ? 'active' : ''}
          onClick={() => setSelectedFilter('financial')}
        >
          <TrendingUp />
          Financial
        </FilterButton>
        <FilterButton 
          className={selectedFilter === 'activity' ? 'active' : ''}
          onClick={() => setSelectedFilter('activity')}
        >
          <TableChart />
          Activity
        </FilterButton>
      </FilterContainer>

      <ReportsGrid>
        {filteredReports.map((report) => (
          <ReportCard key={report.id}>
            <ReportHeader>
              <ReportInfo>
                <ReportTitle>{report.title}</ReportTitle>
                <ReportDescription>{report.description}</ReportDescription>
                <ReportType type={report.type}>
                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                </ReportType>
              </ReportInfo>
            </ReportHeader>

            <ReportStats>
              <StatItem>
                <StatValue>
                  {getTypeIcon(report.type)}
                  {report.records}
                </StatValue>
                <StatLabel>Records</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <FileDownload style={{ fontSize: 16, color: '#999' }} />
                  {report.fileSize}
                </StatValue>
                <StatLabel>File Size</StatLabel>
              </StatItem>
            </ReportStats>

            <div style={{ marginBottom: '16px', fontSize: '12px', color: '#666' }}>
              Last generated: {formatDate(report.lastGenerated)}
            </div>

            <CardActions>
              <ActionButton onClick={() => handleViewReport(report.id)}>
                <Visibility />
                View
              </ActionButton>
              <ActionButton 
                className="download" 
                onClick={() => handleDownloadReport(report.id)}
              >
                <Download />
                Download
              </ActionButton>
            </CardActions>
          </ReportCard>
        ))}
      </ReportsGrid>

      <ActivityLogSection>
        <SectionTitle>Recent Activity Log</SectionTitle>
        <ActivityList>
          <ActivityItem>
            <ActivityIcon>
              <Assessment />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>Device Activity Report generated</ActivityTitle>
              <ActivityTime>2 minutes ago • John Admin</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityIcon>
              <TrendingUp />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>Revenue Analytics exported to CSV</ActivityTitle>
              <ActivityTime>15 minutes ago • Sarah Support</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityIcon>
              <BarChart />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>System Activity Log downloaded</ActivityTitle>
              <ActivityTime>1 hour ago • Mike Owner</ActivityTime>
            </ActivityContent>
          </ActivityItem>
          <ActivityItem>
            <ActivityIcon>
              <PieChart />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>Client Subscription Report viewed</ActivityTitle>
              <ActivityTime>2 hours ago • John Admin</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        </ActivityList>
      </ActivityLogSection>
    </ReportsContainer>
  );
};

export default Reports; 