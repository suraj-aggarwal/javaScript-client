import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useStyles } from './tableStyle';

function SimpleTable(props) {
  const {
    id, data, columns, orderBy, order, onSort, onSelect, classes,
  } = props;
  return (
    <Box margin="2%">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow key={id}>
              {columns.map((column = {}) => (
                <TableCell
                  className={classes.header}
                  align={column.align}
                  sortDirection={orderBy === column.field ? order : false}
                >
                  <TableSortLabel
                    className={classes.tableCell}
                    active={orderBy === column.field}
                    hideSortIcon
                    direction={orderBy === column.field ? order : 'asc'}
                    onClick={() => onSort(column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((element = {}) => (
              <TableRow key={element.id} className={classes.row} hover onClick={() => onSelect(element)}>
                {columns.map(({ field, align, format }) => (
                  <TableCell
                    align={align}
                  >
                    {format ? format(element[field]) : element[field]}
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
  columns: PropTypes.arrayOf(PropTypes.object),
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

SimpleTable.defaultProps = {
  orderBy: 'createdAt',
  order: 'asc',
  data: [],
  columns: [],
  onSort: () => { },
};

export default withStyles(useStyles)(SimpleTable);
