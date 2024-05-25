import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  formControl: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    minWidth: 200,
  },
  grid: {
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  stats: {
    textAlign: 'center',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
}));

export default useStyles;