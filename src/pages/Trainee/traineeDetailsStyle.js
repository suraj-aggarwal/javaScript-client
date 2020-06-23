const styles = (theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(5),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    backgroundColor: '#545454',
    display: 'flex',
    alignItems: 'center',
  },
  Text: {
    color: 'white',
    marginLeft: theme.spacing(5),
  },

  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    color: 'black',
    marginLeft: theme.spacing(70),
  },
});

export { styles };
