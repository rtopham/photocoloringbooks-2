import { STATS_LOADED, CLEAR_STATS } from '../actions/types'

const initialState = {
  stats: null,
  allTimeStats: null,
  otherStats: null,
  stripeStats: null,

  statTables: [],
  otherStatTables: [],
  stripeStatTables: []
}

export default function (state = initialState, action) {
  const { type, payload, payload2, payload3, payload4 } = action

  switch (type) {
    case STATS_LOADED:
      const today = new Date()
      const todayString =
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate() +
        '-' +
        today.getFullYear()

      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString =
        '-' +
        (yesterday.getMonth() + 1) +
        '-' +
        yesterday.getDate() +
        '-' +
        yesterday.getFullYear()

      const firstDayOfTheMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )

      let firstDayOfLastMonth

      if (today.getMonth() === 0) {
        firstDayOfLastMonth = new Date(today.getFullYear() - 1, 11, 1)
      } else {
        firstDayOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        )
      }

      const firstDayOfThisYear = new Date(today.getFullYear(), 0, 1)
      const firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 1)

      const allTimeStats = payload2

      const monthlyStats = payload.filter((stat) =>
        stat.type.includes(today.getMonth() + 1)
      )
      const lastMonthStats = payload.filter((stat) =>
        stat.type.includes(today.getMonth())
      )

      const todayStats = payload.filter((stat) =>
        stat.type.includes(todayString)
      )
      const yesterdayStats = payload.filter((stat) =>
        stat.type.includes(yesterdayString)
      )
      const thisYearStats = payload.filter((stat) =>
        stat.type.includes(today.getFullYear())
      )
      const lastYearStats = payload.filter((stat) =>
        stat.type.includes(today.getFullYear() - 1)
      )

      const countAmount = (statArray, type) => {
        const initialValue = 0
        return statArray.reduce((previousValue, currentValue) => {
          if (currentValue.type.includes(type))
            return previousValue + currentValue.amount
          else return previousValue
        }, initialValue)
      }

      const createStatTable = (statArray, heading, dateInitiated) => {
        return {
          heading: heading,
          dateInitiated: dateInitiated,
          stats: [
            {
              description: 'Images Loaded',
              amount: countAmount(statArray, 'images-loaded')
            },
            {
              description: 'Sign Ups',
              amount: countAmount(statArray, 'signups')
            },
            { description: 'Logins', amount: countAmount(statArray, 'logins') },
            {
              description: 'Pages Saved',
              amount: countAmount(statArray, 'pages-saved')
            },
            {
              description: 'Books Saved',
              amount: countAmount(statArray, 'books-saved')
            }
          ]
        }
      }

      const statTables = []

      statTables.push(createStatTable(todayStats, 'Today', today))
      statTables.push(createStatTable(yesterdayStats, 'Yesterday', yesterday))
      statTables.push(
        createStatTable(monthlyStats, 'This Month', firstDayOfTheMonth)
      )
      statTables.push(
        createStatTable(lastMonthStats, 'Last Month', firstDayOfLastMonth)
      )
      statTables.push(
        createStatTable(thisYearStats, 'This Year', firstDayOfThisYear)
      )
      statTables.push(
        createStatTable(lastYearStats, 'Last Year', firstDayOfLastYear)
      )
      statTables.push(
        createStatTable(allTimeStats, 'All Time Stats', allTimeStats[0].date)
      )

      statTables.push({
        heading: 'Database Stats',
        dateInitiated: today,
        stats: [
          { description: 'Total Pages Stored', amount: payload3.pageCount },
          { description: 'Total Books Stored', amount: payload3.bookCount },
          { description: 'Total Users', amount: payload3.userCount },
          { description: 'Free Users', amount: payload3.freeUserCount },
          { description: 'Paid Users', amount: payload3.paidUserCount }
        ]
      })

      statTables.push({
        heading: 'Stripe Subscription Stats',
        dateInitiated: today,
        stats: [
          {
            description: 'Total Subscriptions',
            amount: payload4.subscriptionsCount
          },
          {
            description: 'Subscriptions This Month',
            amount: payload4.subscriptionsThisMonthCount
          },
          {
            description: 'Subscriptions last Month',
            amount: payload4.subscriptionsLastMonthCount
          },
          {
            description: 'Subscriptions This Year',
            amount: payload4.subscriptionsThisYearCount
          },
          {
            description: 'Subscriptions Last Year',
            amount: payload4.subscriptionsLastYearCount
          }
        ]
      })

      return {
        ...state,
        stats: payload,
        allTimeStats: payload2,
        otherStats: payload3,
        stripeStats: payload4,
        statTables: statTables
      }
    case CLEAR_STATS:
      return {
        ...state,
        stats: null
      }

    default:
      return state
  }
}
