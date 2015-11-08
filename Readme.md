# Supersonic Paper Plane
A full stack js game, built with Ruby on Rails and JavaScript.

## How to Play
games.edmundleex.us

Go to this link, kill the red dots, and stay alive! Submit your
high score.

Beaware, this game is fun and adictive!

## Technology
Technology used
- HTML5 Canvas
- Ruby on Rails
- jQuery
- JavaScript

### Game
Game is built on HTML5 canvas, and vanilla JavaScript.

#### requestAnimationFrame
<b>Pros:</b>

Using requestAnimationFrame, the game is rendering 60 frames per
second, which provides a smooth game experience to players.

<b>Cons:</b>

requestAnimationFrame on Chrome has this [issue][raf_issue] where is generates
unique request id for each frame, which leads to garbage collection
and unstable memory usage.

I have tested various solution, including using dual requestAnimationFrame
to alternately render frames, and changing back to use setInterval. But
they both provides insignificant improvement.

[raf_issue]: https://code.google.com/p/chromium/issues/detail?id=120186

#### Object Pooling
Supersonic Paper Plane is designed with performance in mind. Instead
of relying on the garbage collection cycle, which I have no control
of when and where it happens, I aimed at zero garbage collection.
This keeps frame rate stable at about 60 FPS, and prevent GC process
from slowing frame rendering down.

A W-Linked List datastructure is used to handle object pooling.
This yields stable memory usage and zero garbage collection.

<b>Pros:</b>
Compared to using JavaScript Array, W-linked list provides O(1) time
node deletion from list, which significantly improved collision check,
an operation being executed between frame.

<b>Cons:</b>
Linked list is constructed by nodes that are scattered in random addresses
in memory. This makes traversing through the list slower than traversal
of an Array, which uses contiguous memory addresses.

Currently, when there are over 1500 objects on the scene, the game cannot
maintain 60 FPS.

<b>Possible Solution:</b>
Since the ordered structure provided by linked list is not neccessary
in object pooling implementation, I planned on changing this to use HashSet,
which will use a contiguous memory addresses and provides faster traversal.

#### Enemy Movement AI
Boid objects has their sights. Currently, the logic is having them flock
with the same kind when they 'see' each other. Thanks to the prototypical
inheritance implementation and modular design, this AI can be easily used on
other fun logics, including:
- Chasing Mode
- Scaring Away Mode
- Protecting Weapons from Picked up Mode

#### Group Movement
Group movement is implemented in as a mixin feature to the game. The red dots
themselves don't know how they should spawn and move. The logic is provided
by group movement mixins. This provides flexible game design and many of the
logics can be reused in other games.

#### Dual Canvas
The scene is rendered by two separate canvases. One as playground,
the other as background.

Currently, only the score, combo counter, and timer are rendered on the
background canvas. But this provides flexibility of implementing a dynamic
background.

### Backend
Currently, a simple RESTful backend on Rails is used to keep
all the records.

#### Ranking System
An ambitious ranking system datastructure is under development. It aims to
handle large number of records and yield accurate ranking.

A N-nary tree structure will be implemented. This can provide O(log n) time
lookup, delete and update. And it also minimized the number of read/write to
the database.

However, only the tree structure is not able to handle max traffic concurrency.
The solution is still to be determined. A possible way is setup a queue and only
uses one thread for updating database.

### Frontend
Frontend is built using jQuery, HTML, CSS.

## TODOs
- Deply on Mobile, using PhoneGap
- O(log n) Ranking data structure
- Change object pooling implementation to HashSet
- Combo animation
- Better weapons design
- Dynamic background
- Graphic (spawn animation)
- Irregular shape collision detection for ship
- Gameover design
- Starting scene
- More wapons (bomb)
- Combine boid and asteroid logic
- Dry recyle* function
- Add chasing (scared) enemy logic

##Credits
Background music is provided by my dear friend [David Porter][dporter].
[dporter]: http://www.porterdavid.com