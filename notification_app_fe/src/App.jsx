import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { Log } from '../../logging_middleware/src/logger.browser.js';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        setNotifications(response.data || []);
        await Log('frontend', 'info', 'api', 'Fetched notifications');
      } catch (err) {
        const message = err?.message || 'Error loading data';
        setError(message);
        await Log('frontend', 'error', 'api', message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ pt: 6 }}>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ pt: 6 }}>
        <Typography variant="h5" color="error">
          Error loading data
        </Typography>
        <Typography>{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Notifications
      </Typography>
      <Stack spacing={2}>
        {notifications.map((notification, index) => (
          <Card key={notification.id ?? index}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {notification.title || 'No title'}
              </Typography>
              <Typography>{notification.message || 'No message'}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default App;
