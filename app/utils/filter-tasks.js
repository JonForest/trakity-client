import { getStartOfDay } from './date-funcs'

// Standard condition used by almost all filters
const condition = (startDate, endDate, task) => task.targetDate >= startDate && task.targetDate < endDate

const dateFilters = [
  {
    key: 'TODAY',
    description: 'Today',
    condition,
    startDate: () => {
      let checkDate = new Date()
      return getStartOfDay(checkDate)
    },
    finishDate: () => {
      let checkDate = new Date()
      return getStartOfDay(checkDate.setDate(checkDate.getDate() + 1))
    }
  },
  {
    key: 'TOMORROW',
    description: 'Tomorrow',
    condition,
    startDate: () => {
      let checkDate = new Date()
      return getStartOfDay(checkDate.setDate(checkDate.getDate() + 1))
    },
    finishDate: () => {
      let checkDate = new Date()
      checkDate.setDate(checkDate.getDate() + 1)
      return getStartOfDay(checkDate.setDate(checkDate.getDate() + 1))
    }
  },{
    key: 'REST_OF_WEEK',
    description: 'Rest of the week',
    condition,
    startDate: () => {
      // Start date is not today or tomorrow
      let checkDate = new Date()
      checkDate.setDate(checkDate.getDate() + 2)
      const startDate = getStartOfDay(checkDate)

      // Sunday == 0 for getDay()
      // Is the new startDate a Monday or a Tuesday? In which case 'rest of the week' is actually 'next week'
      if ([1,2].indexOf(startDate.getDay()) > -1) return null
      else return startDate

    },
    finishDate: (startDate) => {
      const checkDate = new Date(startDate)
      return checkDate.getDay() === 0
        ? getStartOfDay(checkDate.setDate(checkDate.getDate() + 1)) // one whole day
        : getStartOfDay(checkDate.setDate(checkDate.getDate() + (7 - checkDate.getDay())))
    }
  },
  {
    key: 'NEXT_WEEK',
    description: 'Next Week',
    condition,
    startDate: () => {
      // Stole this off SO https://stackoverflow.com/a/33078673/403264
      // getDay() - Sunday is 0, Saturday is 6.
      // Therefore `1 + 7 - checkDate.getDay()) % 7` moves the date forward enough days to get to the next monday
      // Note, `setDate(35)` (for example) is clever enough to move into the next month and not barf
      let checkDate = new Date()
      return checkDate.getDay() === 1
        ? getStartOfDay(checkDate.setDate(checkDate.getDate() + 7))
        : getStartOfDay(checkDate.setDate(checkDate.getDate() + (1 + 7 - checkDate.getDay())))
    },
    finishDate: (startDate) => {
      return getStartOfDay((new Date(startDate)).setDate(startDate.getDate() + 7))
    }
  },
  {
    key: 'ALL',
    description: 'All Tasks',
    condition: (startDate, _endDate, task) => {
      return task.targetDate >= startDate || task.targetDate == null
    },
    startDate: () => {
      return getStartOfDay(new Date())
    },
    finishDate: () => {
      // no-op
    }
  }
]

function filterTasksByQueryKey (tasks, queryKey = 'TODAY', startDate = null, finishDate = null) {
  const filter = dateFilters.find(item => item.key === queryKey)
  startDate = startDate || filter.startDate()
  finishDate = finishDate || filter.finishDate(startDate)

  if (startDate == null || finishDate == null) return []

  return tasks
    .filter(task => filter.condition(startDate, finishDate, task))
    .sort((t1, t2) => {
      // todo: not sure if null priority will come out top or bottom here
      if (t1.priority == null && t2.priority == null) return 0
      if (t1.priority == null) return 1
      if (t2.priority == null) return -1
      return t1.priority - t2.priority
    })
}



export { filterTasksByQueryKey }
