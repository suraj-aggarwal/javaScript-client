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

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  header: {
    color: 'grey',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
});

function SimpleTable(props) {
  const {
    id, data, columns, orderBy, order, onSort, onSelect, classes,
  } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow key={id}>
            {columns.map((col) => (
              <TableCell
                className={classes.header}
                align={col.align}
                sortDirection={orderBy === col.field ? order : false}
              >
                <TableSortLabel
                  active={orderBy === col.field}
                  direction={orderBy === col.field ? order : 'asc'}
                  onClick={onSort(col.field)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((element) => (
            <TableRow key={element.id} className={classes.row} hover onMouseEnter={onSelect(element)}>
              {columns.map(({ field, align, format }) => (
                <TableCell align={align}>
                  {format !== undefined ? format(element[field]) : element[field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SimpleTable.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

SimpleTable.defaultProps = {
  orderBy: 'createdAt',
  order: 'asc',
  onSort: () => { },
  onSelect: () => { },
};

export default withStyles(useStyles)(SimpleTable);
