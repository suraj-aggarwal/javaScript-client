import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 600,
    spacing: 8,
  },
  tableCell: {
    color: 'darkgray',
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const {
    id, data, columns,
  } = props;
  return (
    <Box margin="2%">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow key={id}>
              {columns.map((column = {}) => (
                <TableCell align={column.align} className={classes.tableCell}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((element = {}) => (
              <TableRow key={element.id}>
                { columns.map(({ field, align }) => (
                  <TableCell align={align}>
                    {element[field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

SimpleTable.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.array),
};

SimpleTable.defaultProps = {
  data: [],
  columns: [],
};
