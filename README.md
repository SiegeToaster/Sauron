# Sauron
crappy Discord bot

## Info/Installation
Requires a google sheets document and a google app that you are authorized to use.  The app must allow editing and reading your google sheets documents.  If you do not know how to set this up, read the [Google Sheets API Documentation for Node.js](https://developers.google.com/sheets/api/quickstart/nodejs).

The bot also requires a .env file for all configuration info.  This must include your discord bot token, google sheets spreadsheet id, and bot prefix.  An example .env file is:
```
discord_token=your discord bot token here
SpreadsheetId=your google sheets spreadsheet ID here
prefix=your prefix here
```
Note that there are no quotes nor semicolons.

Once everything is setup, run ``npm install`` on the folder that the bot is on.  This will download all of the required Node.js packages automatically.

On the first launch, make sure to use a terminal that you can input data into as a link will appear and give you a token to paste into the terminal.

### Commands
*A check mark indicates that the feature is complete*
- [x] ping
    - messages back 'pong'.
- [x] help
    - messages back an embed of all available commands
- [x] catjam
    - sends a catjam gif.
- [x] ben10
    - sends the text put after the command and this image: https://media.discordapp.net/attachments/831202194673107005/844378006147694622/Thats_far_enough.PNG
- [x] joe
    - messages back 'joe mama'.
- [x] absent
    - Checks is people are offline.  If people are pinged after command, it only checks those, otherwise, it checks everyone.
- [x] troll
    - sends the message declared after the command 25 times.  If the message includes a ping for tobyf, it will replace the ping with 'Sheeshius Sheeshius'.
- [x] gamble
    - randomly picks a number between 1 and 10 and asks user to guess.  Then, says correct if it is correct.
- [x] coinflip
    - Flips a coin, lands on heads or tails.
- [x] jamtime
    - pings everyone asking for jam time and adds reactions for yes or no.  Sends a message whenever someone reacts telling who reacted what.
- [x] rate
    - Sets the score in the database.  After the command, a user must be mentioned followed by a number (the score).  Example:
    - ?rate `@Willius Dominus` 10'
- [x] getscore
    - Gets the score for everyone in the database.  Optional: add mention(s) after the command to get their score only.  Examples:
    - ?getscore
    - ?getScore `@Willius Dominus` `@Bennamus Jullius`
- [x] set
    - sets a setting (ping, pride, virgin, or sus) to true or false
- [x] sheeshius
    - get verses from The Holy Book of Sheeshius
    - chapters, lines, both, or neither can be declared.  For example:
    - ?sheeshius 1:1 (chapter 1 verse 1)
    - ?sheeshius 1 (entire chapter 1)
    - ?sheeshius (entire book of sheeshius)