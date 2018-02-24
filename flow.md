# Goal
Subscribing by default blocks and creates a server. So the true question is, *how do we go serverless?*

# Start Game
1. publish a start message to a channel named `board-uuid`
2. use the uuid to give a URL out to clients
3. beg slackbot for help

# Question Selection
1. captain clicks on question verbally asked for
2. message is broadcast indicating what question is selected
3. captain receives a queue of individuals who answered and selects the top choice
4. captain clicks *incorrect* for any incorrect replies and deletes that person from the queue
5. rinse and repeat until the question is answered or cancelled

# Question Conclusion
1. captain clicks *correct* and correct answer is posted to ledger
2. captain clicks *cancel* and question is stopped
3. queue is cleared

# Daily Double
1. message is sent indicating which player is selected
2. selected player is prompted for a wager and sends it back to the channel
3. captain clicks *correct* or *incorrect* and ledger is updated