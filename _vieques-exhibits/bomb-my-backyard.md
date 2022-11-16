---
title: Bomb my Backyard
locale: en-US
path: "/bomb-my-backyard/"
parent: "/geovisualizing-vieques/"
background_image: vieques/bomb-my-backyard.jpg
description: Visualize the Navy occupcation of Vieques as if it happened in your neighborhood
layout: project
---

During the US Navy's occupation of Vieques (1941-2003), the Navy occupied 22,000 acres of the island and conducted live bombing exercises. "Bomb my Backyard", named for the "Not in My Backyard" sentiment, allows you to visualize the extent of the Navy occupation and the proximity of the bombing exercises by placing an overlay centered on an address of your choice. 

**[Enter the digital exhibit here.](https://bomb-my-backyard.carolinacartography.org/)**

### About the exhibit

*Written by Tomas Roy*

**Background**

While georectifying archived aerial imagery of Vieques, members of our group began to focus on the visible bomb craters left by the US Navy occupation, which eventually prompted a discussion about how these scars on the landscape might be useful in communicating the extent of the occupation to tourists visiting the island. A cursory Google search for "Vieques" suggests most tourists are familiar with the island as an eco-tourism desintation, a place to visit remote beaches and take guided tours of Bahía Bioluminiscente. This idea of a "pristine" and "natural" Vieques stands in sharp contrast to the bomb-scarred landscape at the eastern edge of the island. Over time, we began brainstorming ways to demonstrate to tourists how much of the island was occupied and how close Navy training excersizes occured to the population centers and tourist destinations in Vieques.

The phrase ["Not in my Backyard"](https://en.wikipedia.org/wiki/NIMBY) is generally used to name the phenomenon in which an individual is politically in favor of the development of certain infrastructure, usually affordable housing or utilities, but only if the development doesn't impact the neighborhood they live in. It's clear the same attitude is present in any American indifference to the selection of Vieques as a site for military training excersizes -- only in this case the development actually posed a material threat to the health and safety of the backyard it was located in. 

Because it can be challenging to conceptualize the size of a place you've just arrived in, "Bomb my Backyard" is designed to compare a geography that visitors are familiar with, such as their own neighborhood, with the geography of the Navy occupation of Vieques. We thought it would be powerful if someone could click a button and see a collection of vectors representing American bombing over the subdivision where their friends live, or over the grocery store where they shop for food -- just a few miles down the road from their house.

![exhibit7.jpg](/assets/vieques/exhibit7.jpg)
*The "Bomb my Backyard" exhibit on display in El Fortín*

**Process**

"Bomb my Backyard" was the first digital component of the *Visualizing Vieques* exhibit. I figured the easiest way to include an interactive map in our physical exhibit was to create a website that visitors could use within the museum. We decided to cover an entire wall with a projected display of the website to catch people's attention.

We obtained vectors for both the borders of occupied land and the craters from the U.S. Fish and Wildlife Service, which currently oversees the maintenance and cleanup of most previously occupied Vieques. 

Buying a full-size computer to use for a single exhibit didn't seem like the right way to move forward, so we went with a [Raspberry Pi](https://www.raspberrypi.org/), a small, affordable computer developed using an open-source hardware specification. We used a tutorial on creating a "Raspberry Pi kiosk" to make the computer boot into a fullscreen web browser opened to the website we published for the exhibit, and we wrote a script to make the website perform a hard refresh once an hour in case we needed to push bug fixes or updates.

We eventually realized that running a projector around the clock would be both a waste of electricity and an unneccesary strain on the lamp in the projector. Javier and his wife Ayana worked together to set up a motion sensor that would turn on the projector only when a visitor walked into the room.

Another issue we found was a distortion in the shape of the island when providing an address closer to the poles (e.g. Alaska). We fixed this issue by providing a "scale factor" to the algorithm we wrote to determine new coordinates for the polygons of the island, the occupied territory, and the the bomb craters. Each coordinate pair in these polygons was transposed with the following forumla,
- relative latitude = provided address latitude + (coordinate pair latitude  - el Fortín latitude),
- relative longitude = provided address longitude + (scale factor * (coordinate pair longitude - el Fortín longitude))

The "scale factor" was found using the following formula:
- cos(provided address latitude * degree/radian converter) / cos(el Fortín latitude * degree/radian converter)

The full source code for this exhibit can be found on [Github](https://github.com/carolina-cartography/bomb-my-backyard)