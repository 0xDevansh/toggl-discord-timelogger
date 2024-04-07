const fetch = require('node-fetch-cjs').default;

async function addTimeEntries(timeLogs) {
  try {
    for (const log of timeLogs) {
      const { startHour, startMinute, endHour, endMinute, project, description } = log;
      console.log(`Adding entry: ${startHour}:${startMinute} - ${endHour}:${endMinute}`);
      
      const startTime = getDate(startHour, startMinute)
      const endTime = getDate(endHour, endMinute)
      
      const response = await fetch('https://api.track.toggl.com/api/v9/workspaces/7566708/time_entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${process.env.TOGGL_API_TOKEN}:api_token`).toString('base64')}`,
        },
        body: JSON.stringify({
          description: description,
          start: startTime,
          stop: endTime,
          duration: null, // calculates duration automatically
          created_with: 'Node.js Script',
          workspace_id: process.env.WORKSPACE_ID,
          project_id: log.project
        }),
      });
    }
    return null
  } catch (error) {
    console.error('Error adding time entries:', error.message);
    return error.message
  }
}

function getDate(hour, minute) {
  const date = new Date();
  date.setHours(hour, minute, 0, 0)
  // 5 hours 30 mins = 330 min
  return new Date(date.getTime() - 330 * 60 * 1000)
}

module.exports.addTimeEntries = addTimeEntries