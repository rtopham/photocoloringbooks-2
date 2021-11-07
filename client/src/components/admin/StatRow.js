import React from 'react'

const StatRow = ({ title, date, amount }) => {
  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{amount}</td>
        <td>
          {new Date(date).toLocaleString('en-us', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </td>
      </tr>
    </>
  )
}

export default StatRow
