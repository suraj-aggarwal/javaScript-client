const useStyles = () => ({
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
    '&:nth-child(odd)': { background: '#D3D3D3' },
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#808080',
    },
  },
});

export { useStyles };
