import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  valueContainer: {
    overflow: 'unset !important',
    paddingTop: '12px !important',
    paddingBottom: '12px !important',
  },
  floatingPlaceholder: {
    // left: '10px',
    background: 'white',
    width: 'fit-content',
    position: 'absolute',
    pointerEvents: 'none',
    transition: '0.2s ease all',
    MozTransition: '0.2s ease all',
    WebkitTransition: '0.2s ease all',
    // zIndex: 1,
    // top: '-10px',
    paddingLeft: '6px',
    paddingRight: '6px',
    transform: 'translate(-12px, -26px) scale(0.9)',
  },
}));

export default useStyles;
