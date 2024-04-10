## toggl-discord-timelogger

A simple way to save time logs on Toggl Track by messaging a Discord bot

### Configuration

1) Install dependencies: `npm i` or `yarn`
2) Fill in the required constants in a file config.json (see below)
3) You are good to go

#### The config.json file

Create a file named `config.json` and paste the following:

```json
{
    "discordToken": "your Discord bot token",
    "togglApiToken": "Toggl user token, can be found at https://track.toggl.com/profile",
    "workspaceId": 0,
    "timeZoneOffset": 330,
    "discordUserId": "Your Discord user ID",
    "projectCodes": {
        "example": 10000
    }
}
```

Timezone offset is the total number of minutes that need to be deducted to convert your local timezone to GMT.

For example, Indian Standard Time (IST) is 5h 30m ahead of GMT, which means 330 minutes must be deducted from current time to get the current GMT time.
Thus `TIMEZONE_OFFSET=330`

#### The project codes

These are a single **lowercase** word to represent your project for which the log is to be added.

### Usage

Simply send a DM message to the bot, where each line represents one time log.

The format is: 

```
startTime - endTime ProjectCode Description for this log
```

Where time must be in 24 hour HH:MM format.

A sample message is:

```
7:00 - 9:14 code Worked on toggl-discord-timelogger
13:34 - 14:03 study Studied for next exam
```

Here code and study represent the codes for Toggl projects that I might have specified in `index.js` as:

```json
"projectCodes": {
    "code": 200712959,
    "study": 200712960,
}
```