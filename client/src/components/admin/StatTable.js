import React from 'react'
import { Table } from 'react-bootstrap'

import StatRow from './StatRow'

const StatTable = ({ tableData: { heading, dateInitiated, stats } }) => {
  return (
    <>
      <h6 className='text-info'>{heading}</h6>
      <Table className='statsTable' striped bordered hover>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Total</th>
            <th>Date Initiated</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, i) => {
            return (
              <StatRow
                title={stat.description}
                date={dateInitiated}
                amount={stat.amount}
                key={i}
              />
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default StatTable
