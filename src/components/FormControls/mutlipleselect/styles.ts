import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 2.5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(65, 69, 69, .14)',
    borderRadius: 18,
    marginBottom: 2,
    marginTop: 2,
  },
  noLabel: {
    // marginTop: theme.spacing(3),
  },
}));

export default useStyles;
