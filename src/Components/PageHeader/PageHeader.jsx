import { Card, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fdfdff',
  },
  pageheader: {
    padding: theme.spacing(4),
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  headerIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#3c44b1',
  },
  headerTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '.6',
    },
  },
  instructions: {
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    maxWidth: '60%',
    '& .MuiTypography-subtitle1': {
      opacity: '.6',
    },
  },
}));

const PageHeader = (props) => {
  const { icon, title, subtitle, titleInstructions, bodyInstructions } = props;
  const classes = useStyles();
  return (
    <Paper elevation={1} square={true} className={classes.root}>
      <div className={classes.pageheader}>
        <Card square={true} className={classes.headerIcon}>
          {icon}
        </Card>
        {/*  ------------------------------------------------------------------ title + subtitle */}
        <div className={classes.headerTitle}>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          <Typography variant='subtitle2' component='div'>
            {subtitle}
          </Typography>
        </div>
        {/*  ------------------------------------------------------------------------- instructions */}
        <div className={classes.instructions}>
          <Typography variant='h6' component='div'>
            {titleInstructions}
          </Typography>
          <Typography variant='subtitle1' component='div'>
            {bodyInstructions}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;
