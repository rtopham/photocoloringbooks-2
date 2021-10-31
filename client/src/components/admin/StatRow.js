import React from 'react'

const StatRow = ({ stat }) => {
  const date = new Date(stat.date).toString().substr(4, 11)
  return (
    <>
      <tr>
        <td>{stat.description}</td>
        <td>{date}</td>

        <td>{stat.amount}</td>
      </tr>
    </>
  )
}

export default StatRow
