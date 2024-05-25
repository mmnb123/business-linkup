// import React, { useEffect, useState } from 'react';
// import GeneralStats from '../components/GeneralStats';
// import EngagementStats from '../components/EngagementStats';

// const DashboardPage = () => {
//     const [stats, setStats] = useState({ friends: 0, following: 0, posts: 0, likes: 0, comments: 0 });
//     const [duration, setDuration] = useState('week'); // default to 'week'
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const token = localStorage.getItem('accessToken');
//                 if (!token) {
//                     throw new Error('No token found in local storage');
//                 }

//                 const response = await fetch(`http://localhost:5000/api/stats?duration=${duration}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     if (response.status === 401) {
//                         throw new Error('Unauthorized access - Invalid or expired token');
//                     } else {
//                         throw new Error(`HTTP error! Status: ${response.status}`);
//                     }
//                 }

//                 const data = await response.json();
//                 setStats(data);
//             } catch (error) {
//                 setError(error.message);
//                 console.error('Failed to fetch data:', error.message);
//             }
//         };

//         fetchStats();
//     }, [duration]);

//     const handleDurationChange = (event) => {
//         setDuration(event.target.value);
//     };

//     return (
//         <div>
//             <h1>Dashboard</h1>
//             {error && <p className="error">Error: {error}</p>}
//             <label>
//                 Select Time Duration:
//                 <select value={duration} onChange={handleDurationChange}>
//                     <option value="week">Last Week</option>
//                     <option value="month">Last Month</option>
//                     <option value="day">Last Day</option>
//                 </select>
//             </label>
//             <GeneralStats stats={stats} />
//             <EngagementStats stats={stats} />
//         </div>
//     );
// };

// export default DashboardPage;
import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import GeneralStats from '../components/GeneralStats';
import EngagementStats from '../components/EngagementStats';
import useStyles from '../components/styles';
import '../styles/stats.css';

const DashboardPage = () => {
  const classes = useStyles();
  const [currentStats, setCurrentStats] = useState({ friends: 0, following: 0, posts: 0, likes: 0, comments: 0 });
  const [prevStats, setPrevStats] = useState({ friends: 0, following: 0, posts: 0, likes: 0, comments: 0 });
  const [duration, setDuration] = useState('week'); // default to 'week'

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/stats?duration=${duration}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setCurrentStats(data.current);
        setPrevStats(data.previous);
      } catch (error) {
        console.error('Failed to fetch data:', error.message);
        alert('Failed to fetch data. Please try again later.');
      }
    };

    fetchStats();
  }, [duration]);

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const calculateDifference = (current, previous) => current - previous;

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}> Statistics Dashboard</Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="duration-label">Select Time Duration</InputLabel>
        <Select
          labelId="duration-label"
          value={duration}
          onChange={handleDurationChange}
          label="Select Time Duration"
        > 
          <MenuItem value="day">Last Day</MenuItem>
          <MenuItem value="week">Last Week</MenuItem>
          <MenuItem value="month">Last Month</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <GeneralStats stats={currentStats} prevStats={prevStats} calculateDifference={calculateDifference} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <EngagementStats stats={currentStats} prevStats={prevStats} calculateDifference={calculateDifference} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;