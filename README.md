## toggl-discord-timelogger

A simple way to save time logs on Toggl Track by messaging a Discord bot

### Configuration

1) Install dependencies: `npm i` or `yarn`
2) Fill in the required constants in .env
3) Configure your project codes in `index.js`
4) You are now good to go

#### The .env file

Create a file named `.env` and paste the following:

```
TOKEN="Discord bot token"
TOGGL_API_TOKEN="Toggl user token, can be found at https://track.toggl.com/profile"
WORKSPACE_ID="Toggl workspace ID"
TIMEZONE_OFFSET=0
USER_ID="Your Discord user ID"
```

Timezone offset is the total number of minutes that need to be deducted to convert your local timezone to GMT.

For example, Indian Standard Time (IST) is 5h 30m ahead of GMT, which means 330 minutes must be deducted from current time to get the current GMT time.
Thus `TIMEZONE_OFFSET=330`

#### The project codes

These are a single word to represent your project for whic the log is to be added.

### Usage

Simply send a DM message to the bot, where each line represents one time log.

The format is: 

```
startTime - endTime ProjectCode Description for this log
```

Where time must be in 24 hour HH:MM format.

A sample message is:

```
7:00 - 9:14 Code Worked on toggl-discord-timelogger
13:34 - 14:03 Study Studied for next exam
```

Here Code and Study represent the codes for Toggl projects that I might have specified in `index.js` as:

```js
const typeToProject = {
    Code: 200712959,
    Study: 200712960,
}
```