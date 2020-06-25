const useStyles = (theme) => ({
  table: {
    minWidth: 600,
    spacing: 8,
  },
  tableCell: {
    color: 'darkgray',
  },
  header: {
    color: 'grey',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: 'pointer',
  },
});

export { useStyles };
