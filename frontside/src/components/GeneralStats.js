import React from 'react';
import { Typography } from '@mui/material';
import useStyles from '../components/styles';

const GeneralStats = ({ stats, prevStats, calculateDifference }) => {
  const classes = useStyles();
  const renderDifference = (current, previous) => {
    const difference = calculateDifference(current, previous);
    const isPositive = difference >= 0;

    return (
      <span style={{ color: isPositive ? 'green' : 'red' }}>
        {isPositive ? '+' : ''}{difference}
      </span>
    );
  };

  return (
    <div className={classes.stats}>
      <Typography variant="h6" className={classes.title}>General Statistics</Typography>
      <Typography variant="body1">Friends: {stats.friends} ({renderDifference(stats.friends, prevStats.friends)})</Typography>
      <Typography variant="body1">Following: {stats.following} ({renderDifference(stats.following, prevStats.following)})</Typography>
      <Typography variant="body1">Posts: {stats.posts} ({renderDifference(stats.posts, prevStats.posts)})</Typography>
    </div>
  );
};

export default GeneralStats;