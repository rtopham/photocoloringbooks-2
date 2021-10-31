import React, { useEffect } from 'react'
import { Table, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

import { loadStats } from '../../redux/actions/stats'

import StatRow from './StatRow'

const Admin = ({ stats: { stats }, loadStats }) => {
  useEffect(() => {
    if (stats === null) loadStats()
    console.log(stats)
  }, [stats, loadStats])
  if (!stats)
    return (
      <Spinner
        animation='border'
        variant='primary'
        className='d-block mx-auto'
      />
    )
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Date Initiated</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, i) => {
            return <StatRow stat={stat} key={stat._id} />
          })}
        </tbody>
      </Table>
    </>
  )
}

const mapStateToProps = (state) => ({
  stats: state.stats
})

export default connect(mapStateToProps, { loadStats })(Admin)
