# Sauron
crappy Discord bot

## Info/Installation
Requires a mySQL server
use the following commands to setup the proper database, tables, and columns:
```
-- Database and table creation
CREATE SCHEMA IF NOT EXISTS sauronscores;
USE sauronscores;
CREATE TABLE IF NOT EXISTS scores (userID CHAR(18), totalScore BIGINT, amountOfRatings BIGINT, highestRating TINYINT, averageRating TINYINT);
CREATE TABLE IF NOT EXISTS settings (ping TINYINT, pride TINYINT, virgin TINYINT, sus TINYINT);
CREATE TABLE IF NOT EXISTS swearwords (userID CHAR(18), numberOfWords BIGINT, fNumber BIGINT, sNumber BIGINT, rNumber BIGINT);
-- add default setting values
INSERT INTO settings (ping, pride, virgin, sus) VALUES (1, 0, 0, 1);
```

Requires a file called 'private.json' for all private info.  This must include your discord bot token and SQL root account password.  An example private.json file is:
```
{
    "discord_token": "your discord bot token here",
    "SQLPassword": "your SQL root account password here"
}
```

### Commands
*An x indicates that the feature is complte*
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
    - pings everyone asking for jam time and adds reactions.  People who react :x: will be called out.
- [x] rate
    - Sets the score in the database.  After the command, a user must be mentioned followed by a number (the score).  Example:
    - ?rate `@Willius Dominus` 10'
- [x] getscore
    - Gets the score for everyone in the database.  Optional: add mention(s) after the command to get their score only.  Examples:
    - ?getscore
    - ?getScore `@Willius Dominus` `@Bennamus Jullius`
- [x] set
    - sets a setting (ping, pride, virgin, or sus) to true or false
- [x] getswear
    - works identically to getscore except it tells you the amount of time someone has said swear words.
- [x] resetscores
    - inititates a vote to reset all scores to 0.  Vote must be unanimous.