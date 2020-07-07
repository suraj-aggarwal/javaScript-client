import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useStyles } from './tableStyle';
import { withLoaderAndMessage } from '../../../../components';

function SimpleTable(props) {
  const {
    id, data, columns, orderBy, order, onSort, onSelect, classes, actions, rowsPerPage,
    page, onChangePage, count, handleChangeRowsPerPage,
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
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((element = {}) => (
                <TableRow
                  key={element.id}
                  className={classes.row}
                  hover
                  onClick={() => onSelect(element)}
                >
                  {columns.map(({ field, align, format }) => (
                    <TableCell
                      align={align}
                    >
                      {format ? format(element[field]) : element[field]}
                    </TableCell>
                  ))}
                  {actions.map(({ Icon, handler }) => (
                    <TableCell onClick={handler()}>
                      {Icon}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={onChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
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
  actions: PropTypes.arrayOf(PropTypes.object),
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

SimpleTable.defaultProps = {
  orderBy: 'createdAt',
  order: 'asc',
  data: [],
  columns: [],
  onSort: () => { },
  actions: [],
};

export default withStyles(useStyles)(withLoaderAndMessage(SimpleTable));
