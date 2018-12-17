# Justin & Dragons

![Justin & Dragons Logo](https://raw.githubusercontent.com/juan0tron/justin-and-dragons/master/src/images/justin-and-dragons-logo.png)

An interactive timeline of the events so far in Justin's D&D campaign. Built in React, hosted on GitHub.

# Credits

- Code by [Jon](http://jglover.space/)
- Concept and content by [Justin](https://twitter.com/Blaynevin)
- Backgrounds by [momeG](https://mome-g.itch.io/pixel-art-parallax-backgrounds)

# To Do

* Locations
- 1st is forest, 2nd desert, 3rd is other forest, 4th is purple crystals

* UX Improvements:
- Translate vertical scroll wheel activity into horizontal scroll
- Crossfade descriptions when they change

* Presentation/Extra Polish:
- Figure out a place to use the DnD poster
- Create an intro slide/screen

* Party Members:
- Improve the logic behind comparing party members on event changes
- Fix animations for members joining/leaving
- Adjust positioning of party members
- Choose new sprites for all party members

* Backgrounds:
- Fix width calculation for parallax layers (in firefox)
- Find a solution for crossfading from scene to scene, CSS transition is very resource intensive

# Long-Term To Do's

- Refactor the hell out of this
    - Create component specifically to handle parallax images/css
    - Move as much stuff as possible out of App.js and into their relevant components
- Add page routing
- Add Page: Player
  - Show a list of characters that player has used
  - Show player/character statistics
  - Hotlink mentions of this player to this page
- Add Page: Location
  - Hotlink mentions of this location to this page
