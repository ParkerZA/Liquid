import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function Queries({queries}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">From</TableCell>
            <TableCell align="left">Amount</TableCell>
            <TableCell align="left">To</TableCell>
            <TableCell align="right">Conversion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {queries.map((query, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{query.from}</TableCell>
              <TableCell align="left">{query.amount}</TableCell>
              <TableCell align="left">{query.to}</TableCell>
              <TableCell align="right">{query.conversion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}