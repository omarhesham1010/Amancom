import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Settings as SettingsIcon,
  Business,
  Palette,
  Security,
  Notifications as NotificationsIcon,
  Save,
  Refresh
} from '@mui/icons-material';

const SettingsContainer = styled.div`
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

const SaveButton = styled.button`
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

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
  background: white;

  &:focus {
    border-color: #667eea;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const SwitchLabel = styled.div`
  display: flex;
  flex-direction: column;
`;

const SwitchTitle = styled.span`
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const SwitchDescription = styled.span`
  font-size: 12px;
  color: #666;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #667eea;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ColorPalette = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
  border: 3px solid ${props => props.selected ? '#667eea' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Settings = () => {
  const [settings, setSettings] = useState({
    company: {
      name: 'Amancom GPS Management',
      email: 'info@amancom.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Street, New York, NY 10001',
      website: 'https://amancom.com'
    },
    theme: {
      primaryColor: '#667eea',
      darkMode: false,
      compactMode: false
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      deviceDisconnection: true,
      subscriptionExpiry: true,
      systemMaintenance: false
    },
    api: {
      baseUrl: 'http://localhost:5000',
      timeout: 30000,
      retryAttempts: 3
    }
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Handle save logic
  };

  const handleReset = () => {
    console.log('Resetting settings');
    // Handle reset logic
  };

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const colorOptions = [
    '#667eea', '#10b981', '#f59e0b', '#ef4444', 
    '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
  ];

  return (
    <SettingsContainer>
      <PageHeader>
        <PageTitle>Settings</PageTitle>
        <HeaderActions>
          <SaveButton onClick={handleSave}>
            <Save />
            Save Changes
          </SaveButton>
        </HeaderActions>
      </PageHeader>

      <SettingsGrid>
        {/* Company Information */}
        <SettingsCard>
          <CardHeader>
            <Business style={{ color: '#667eea' }} />
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          
          <FormGroup>
            <Label>Company Name</Label>
            <Input
              type="text"
              value={settings.company.name}
              onChange={(e) => updateSetting('company', 'name', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              value={settings.company.email}
              onChange={(e) => updateSetting('company', 'email', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={settings.company.phone}
              onChange={(e) => updateSetting('company', 'phone', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Address</Label>
            <TextArea
              value={settings.company.address}
              onChange={(e) => updateSetting('company', 'address', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Website</Label>
            <Input
              type="url"
              value={settings.company.website}
              onChange={(e) => updateSetting('company', 'website', e.target.value)}
            />
          </FormGroup>
        </SettingsCard>

        {/* Theme Settings */}
        <SettingsCard>
          <CardHeader>
            <Palette style={{ color: '#667eea' }} />
            <CardTitle>Theme Settings</CardTitle>
          </CardHeader>

          <FormGroup>
            <Label>Primary Color</Label>
            <ColorPalette>
              {colorOptions.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={settings.theme.primaryColor === color}
                  onClick={() => updateSetting('theme', 'primaryColor', color)}
                />
              ))}
            </ColorPalette>
          </FormGroup>

          <SwitchContainer>
            <SwitchLabel>
              <SwitchTitle>Dark Mode</SwitchTitle>
              <SwitchDescription>Enable dark theme for the application</SwitchDescription>
            </SwitchLabel>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={settings.theme.darkMode}
                onChange={(e) => updateSetting('theme', 'darkMode', e.target.checked)}
              />
              <Slider />
            </Switch>
          </SwitchContainer>

          <SwitchContainer>
            <SwitchLabel>
              <SwitchTitle>Compact Mode</SwitchTitle>
              <SwitchDescription>Use compact layout for better space utilization</SwitchDescription>
            </SwitchLabel>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={settings.theme.compactMode}
                onChange={(e) => updateSetting('theme', 'compactMode', e.target.checked)}
              />
              <Slider />
            </Switch>
          </SwitchContainer>
        </SettingsCard>

        {/* Notifications */}
        <SettingsCard>
          <CardHeader>
            <NotificationsIcon style={{ color: '#667eea' }} />
            <CardTitle>Notifications</CardTitle>
          </CardHeader>

          <SwitchContainer>
            <SwitchLabel>
              <SwitchTitle>Email Alerts</SwitchTitle>
              <SwitchDescription>Receive important notifications via email</SwitchDescription>
            </SwitchLabel>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={(e) => updateSetting('notifications', 'emailAlerts', e.target.checked)}
              />
              <Slider />
            </Switch>
          </SwitchContainer>

          <SwitchContainer>
            <SwitchLabel>
              <SwitchTitle>Push Notifications</SwitchTitle>
              <SwitchDescription>Show browser notifications for real-time alerts</SwitchDescription>
            </SwitchLabel>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={settings.notifications.pushNotifications}
                onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
              />
              <Slider />
            </Switch>
          </SwitchContainer>

          <SwitchContainer>
            <SwitchLabel>
              <SwitchTitle>Device Disconnection</SwitchTitle>
              <SwitchDescription>Alert when GPS devices go offline</SwitchDescription>
            </SwitchLabel>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={settings.notifications.deviceDisconnection}
                onChange={(e) => updateSetting('notifications', 'deviceDisconnection', e.target.checked)}
              />
              <Slider />
            </Switch>
          </SwitchContainer>

          <SwitchContainer>
            <SwitchLabel>
              <SwitchTitle>Subscription Expiry</SwitchTitle>
              <SwitchDescription>Remind before subscriptions expire</SwitchDescription>
            </SwitchLabel>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={settings.notifications.subscriptionExpiry}
                onChange={(e) => updateSetting('notifications', 'subscriptionExpiry', e.target.checked)}
              />
              <Slider />
            </Switch>
          </SwitchContainer>
        </SettingsCard>

        {/* API Configuration */}
        <SettingsCard>
          <CardHeader>
            <Security style={{ color: '#667eea' }} />
            <CardTitle>API Configuration</CardTitle>
          </CardHeader>

          <FormGroup>
            <Label>Base URL</Label>
            <Input
              type="url"
              value={settings.api.baseUrl}
              onChange={(e) => updateSetting('api', 'baseUrl', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Timeout (ms)</Label>
            <Input
              type="number"
              value={settings.api.timeout}
              onChange={(e) => updateSetting('api', 'timeout', parseInt(e.target.value))}
            />
          </FormGroup>

          <FormGroup>
            <Label>Retry Attempts</Label>
            <Select
              value={settings.api.retryAttempts}
              onChange={(e) => updateSetting('api', 'retryAttempts', parseInt(e.target.value))}
            >
              <option value={1}>1 attempt</option>
              <option value={2}>2 attempts</option>
              <option value={3}>3 attempts</option>
              <option value={5}>5 attempts</option>
            </Select>
          </FormGroup>
        </SettingsCard>
      </SettingsGrid>
    </SettingsContainer>
  );
};

export default Settings; 