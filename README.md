# Sam's Memory Game Project

This is a version of the Udacity Front-End Nanodegree Course project - Memory Game
_Student - Sam Thompson_

**The Aim of the game is to find/remember where card pairs are and select the pairs as quickly as possible, making the fewest moves and fewest errors.**

## Table of Contents

* [Instructions](#instructions)
* [Scoring](#scoring)

## Instructions

### Initial Screen

The player is shown an example screen. The 4x4 size, layout and style will remain the same. The timer, moves taken counter and 'stars' counter will remain in place as well as the reset button. There are only 2 of each type of card.

**The timer will not start until the player has set the board and made a move**

### Controls

The player will click or touch the screen for all controls other than entering a name when prompted (if the player wishes to do so).

At any point the player can reset the board at the top right corner of the screen, which will reset moves, 'stars' and timer.

### Gameplay

_**The Aim of the game is to find/remember where card pairs are and select the pairs as quickly as possible, making the fewest moves and fewest errors.**_

Start a game by clicking the 'Restart' button, top-right.

Select any 2 cards to see if they match:

* If they do they will remain face-up and the player can immediately make another move. Each card selection counts as a move. Only legal moves are allowed and counted.

* If the cards do not match, they will remain face-up for a few seconds to allow you to try to memorise their positions. During this period no further moves can be made. Once the cards turn face-down, the player may continue.

The game is won when all pairs are matched and a congratulatory screen will confirm this along with a score and statistics. The player is asked if they wish to replay or quit.

## Scoring

The score is made up from a combination of speed and accuracy.

* Fewer than 30 moves will equate to 3 stars. 30-39 moves equates to 2 stars. 40 or more moves equates to 1 star.

* The faster the game is won the higher the time component of the score.

Both factors are weighed up and a score is given. If the player is in the top 5 in the browser session they will appear on the 'Top 5 Scores' scoreboard below the play area.
