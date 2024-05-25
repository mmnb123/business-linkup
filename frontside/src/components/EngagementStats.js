import React from 'react';
import { Typography } from '@mui/material';
import useStyles from '../components/styles';



const EngagementStats = ({ stats, prevStats, calculateDifference }) => {
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
      <Typography variant="h6" className={classes.title}>Engagement Statistics</Typography>
      <Typography variant="body1">Likes: {stats.likes} ({renderDifference(stats.likes, prevStats.likes)})</Typography>
      <Typography variant="body1">Comments: {stats.comments} ({renderDifference(stats.comments, prevStats.comments)})</Typography>
    </div>
  );
};

export default EngagementStats;