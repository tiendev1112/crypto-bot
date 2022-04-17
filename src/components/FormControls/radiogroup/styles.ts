import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: ({ margin }: any) =>
      margin === 'normal' ? theme.spacing(1) : 0,
  },
}));

export default useStyles;
