import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'

import { loadStats } from '../../redux/actions/stats'

import StatTable from './StatTable'

const Admin = ({ stats: { stats, allTimeStats, statTables }, loadStats }) => {
  useEffect(() => {
    if (stats === null) loadStats()
  }, [stats, loadStats])

  if (!stats || !allTimeStats || statTables.length === 0)
    return (
      <Spinner
        animation='border'
        variant='primary'
        className='d-block mx-auto'
      />
    )

  return (
    <>
      {statTables.map((statTable, i) => {
        return <StatTable tableData={statTable} key={i} />
      })}
    </>
  )
}

const mapStateToProps = (state) => ({
  stats: state.stats
})

export default connect(mapStateToProps, { loadStats })(Admin)
