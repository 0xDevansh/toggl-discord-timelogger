const fetch = require('node-fetch-cjs').default;
const config = require("./config.json")

async function addTimeEntries(timeLogs, date) {
  try {
    for (const log of timeLogs) {
      const { startHour, startMinute, endHour, endMinute, project, description } = log;
      console.log(`Adding entry: ${startHour}:${startMinute} - ${endHour}:${endMinute}`);
      
      const startTime = getDate(startHour, startMinute, date)
      const endTime = getDate(endHour, endMinute, date)
      
      const response = await fetch(`https://api.track.toggl.com/api/v9/workspaces/${config.workspaceId}/time_entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${config.togglApiToken}:api_token`).toString('base64')}`,
        },
        body: JSON.stringify({
          description: description,
          start: startTime,
          stop: endTime,
          duration: null, // calculates duration automatically
          created_with: 'Node.js Script',
          workspace_id: config.workspaceId,
          project_id: log.project
        }),
      });

      if (response.status !== 200) {
        throw new Error(await response.text())
      }
    }
    return null
  } catch (error) {
    console.error('Error adding time entries:', error.message);
    return error.message
  }
}

function getDate(hour, minute, date) {
  const dateTime = new Date(date);
  dateTime.setHours(hour, minute, 0, 0)
  return new Date(dateTime.getTime() - config.timeZoneOffset * 60 * 1000)
}

module.exports.addTimeEntries = addTimeEntries