// import {dateFilters} from 'client/constants'
import { getStartOfDay } from './date-funcs'
// import _curry from 'lodash/curry'
// import _includes from 'lodash/includes'
// import { formatShortDate } from 'client/helpers/format-short-date'

// Standard condition used by almost all filters
const condition = (startDate, endDate, task) => task.startDate >= startDate && task.startDate < endDate

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
  // {
  //   key: dateFilters.THISWEEK,
  //   description: 'This Week',
  //   condition,
  //   startDate: () => {
  //     return getStartOfDay(new Date())
  //   },
  //   finishDate: () => {
  //     let checkDate = new Date()
  //     return checkDate.getDay() === 0
  //       ? getStartOfDay(checkDate)
  //       : getStartOfDay(checkDate.setDate(checkDate.getDate() + (7 - checkDate.getDay())))
  //   }
  // },
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
  // {
  //   key: dateFilters.ALL,
  //   description: 'All Tasks',
  //   condition: (startDate, _endDate, task) => {
  //     return task.startDate >= startDate || task.startDate == null
  //   },
  //   startDate: () => {
  //     return getStartOfDay(new Date())
  //   },
  //   finishDate: (startDate) => {
  //     // no-op
  //   }
  // }
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

// function filterTasksByTags (tasks, tags) {
//   if (!tasks || !tasks.length) return []
//
//   const filteredTasks = !tags || !tags.length || !tags.any(tag => !tag.show)
//     ? tasks.map(task => task)
//     : tasks.filter(task => task.tags.any(tag => tag.show))
//
//   return filteredTasks
//   // sort based on priority.  Note, not all tasks may have priority
//   // const sorted = filteredTasks.sort((taskA, taskB) => {
//   //   const priorityA = taskA.priority
//   //   const priorityB = taskB.priority
//   //
//   //   // Handle null scenarios
//   //   if (priorityA == null && priorityB != null) return 1
//   //   if (priorityA != null && priorityB == null) return -1
//   //   if (priorityA == null && priorityB == null) return 0
//   //
//   //   return priorityA - priorityB
//   // })
//   // return sorted
// }
//
// function orderTasksByDate (tasks) {
//   const sorted = tasks.sort((taskA, taskB) => {
//     const targetA = taskA.startDate
//     const targetB = taskB.startDate
//
//     if (targetA == null && targetB != null) return 1
//     if (targetA != null && targetB == null) return -1
//     if (targetA == null && targetB == null) return 0
//
//     return targetA.getTime() - targetB.getTime()
//   })
//
//   return sorted
// }

// function getTitle (queryKey = dateFilters.TODAY) {
//   const filter = queueConfig.find(item => item.key === queryKey)
//   let desc = filter.description
//   if (_includes(desc, '%s') || _includes(desc, '%f')) {
//     const startDate = filter.startDate()
//     desc = desc.replace('%s', formatShortDate([startDate]))
//     desc = desc.replace('%f', formatShortDate([filter.finishDate(startDate)]))
//   }
//   return desc
// }

/**
 * Get all the Queues that this task belongs to
 * @param task
 * @returns {Array}
 */
// function getTasksQueues (task) {
//   const matchedQueues = Object.keys(dateFilters).reduce((acc, key) => {
//     const results = filterTasksByQueue([task], dateFilters[key])
//     if (results && results.length) {
//       acc.push(key)
//     }
//     return acc
//   }, [])
//
//   return matchedQueues
// }

export { filterTasksByQueryKey/*, filterTasksByTags, getTitle, orderTasksByDate, getTasksQueues */}
