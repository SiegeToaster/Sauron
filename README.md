# Sauron
crappy Discord bot

## Info/Installation
Requires a google sheets document and a google app that you are authorized to use.  The app must allow editing and reading your google sheets documents.  If you do not know how to set this up, read the [Google Sheets API Documentation for Node.js](https://developers.google.com/sheets/api/quickstart/nodejs).

The bot also requires a file called 'private.json' for all private info.  This must include your discord bot token and google sheets spreadsheet ID.  An example private.json file is:
```
{
    "discord_token": "your discord bot token here",
    ""SpreadsheetId": "your google sheets spreadsheet ID here"
}
```

Once everything is setup, run ``npm install`` on the folder that the bot is on.  This will download all of the required Node.js packages automatically.

On the first launch, make sure to use a terminal that you can input data into as a link will appear and give you a token to paste into the terminal.

### Commands
*A check mark indicates that the feature is complte*
- [x] ping
    - messages back 'pong'.
- [x] help
    - messages back an embed of all available commands
- [x] catjam
    - sends a catjam gif.
- [x] ben10
    - sends the text put after the command and this image: https://media.discordapp.net/attachments/831202194673107005/844378006147694622/Thats_far_enough.PNG
- [x] delete
    - Sends a picture of Pepe holding a sign that say "Delete That!!" (https://media.discordapp.net/attachments/761347053983891499/842548851310985236/delete.jpg).  Coincidentally, anyone sending that image makes the bot delete the message directly above it.
- [x] joe
    - messages back 'joe mama'.
- [x] absent
    - Checks is people are offline.  If people are pinged after command, it only checks those, otherwise, it checks everyone.
- [x] troll
    - sends the message declared after the command 25 times.  If the message includes a ping for tobyf, it will replace the ping with 'Sheeshus Sheeshius'.
- [x] gamble
    - randomly picks a number between 1 and 10 and asks user to guess.  Then, says correct if it is correcet.
- [x] coinflip
    - Flips a coin, lands on heads or tails.
- [x] jamtime
    - pings everyone asking for jam time and adds reactions for yes or no.  sends a message whenever someone reacts telling who reacted what.
- [x] rate
    - Sets the score in the database.  After the command, a user must be mentioned followed by a number (the score).  Example:
    - ?rate `@Willius Dominus` 10'
- [x] getscore
    - Gets the score for everyone in the database.  Optional: add mention(s) after the command to get their score only.  Examples:
    - ?getscore
    - ?getScore `@Willius Dominus` `@Bennamus Jullius`
- [x] set
    - sets a setting (ping, pride, virgin, or sus) to true or false
- [ ] sheeshius
    - get a verse from The Holy Book of Sheeshius
    - chapters/lines can be declared.  For example:
    - ?sheeshius 1:1
- [ ] sheeshiusadd
    - add a verse to The Holy Book of Sheeshius
    - need to define chapter.  For example:
    - ?sheeshiusadd 1 super interesting verse here
    - a vote is then created, must have the support of 1 other member before being added.
    - might not add this
- [ ] addplaylist
    - adds a song to the database.  After the command, a song name and a link must be added.  Optionally, the artist name can be added Examples:
    - ?addplaylist Hey Ya! https://www.youtube.com/watch?v=PWgvGjAhvIw
    - ?addplaylist Blitzkrieg Bop https://www.youtube.com/watch?v=iymtpePP8I8 Ramones
- [ ] getplaylist
    - get a song from playlist
    - without anything after command, returns a random song name and link
    - with 'all' after command, returns all song names in playlist
    - with a song name after command, returns song name and link of song (if it exists in the playlist)
    - with an artist after command, returns all songs by artists (if it exists in the playlist)
    - examples:
        - ?getplaylist all
        - ?getplaylist Hey Ya!
        - ?getplaylist Ramones