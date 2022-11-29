---
title: Boat Tracker
locale: en-US
path: "/boat-tracker/"
layout: project
parent: "/geovisualizing-vieques/"
background_image: vieques/boat-tracker.jpg
description: Tracking deparatures and arrivals of the Ceiba-Vieques ferry using citizen
  science
---

*Written by Tomas Roy*

**Background**  
Vieques is separated from the main island of Puerto Rico by 26 kilometers, a roughly 30 minute ferry ride to the Ceiba Ferry Terminal. The Vieques - Puerto Rico ferry service has a history of unreliability, which is a cruical issue for residents of Vieques who rely on the ferry for access to health care and groceries and who commute to the main island for work. Since Hurricane Maria in 2017, there is no hospital on Vieques, making reliable access to mainland Puerto Rico even more essential.

Outrage over the lack of reliable ferry service has led to [numerous protests](https://www.latinorebels.com/2022/01/26/prferries/) over the last several years. Residents report an unfinished ferry terminal in Ceiba, needing to wake up to catch a ferry as early as 3:30am, having to sleep in their cars on the main island due to overbooked return trips, vessel maintenance issues, and the lack of prioritization of residents over tourists.

In October 2020, the ferry service was privitized by U.S. ferry company HMS Ferries.

**About "boat tracking"**  
Marine vessels over a certain size are [required](https://en.wikipedia.org/wiki/Automatic_identification_system#Vessel-based_AIS_transceivers) to transmit information about their location, course and speed using a technology called AIS. AIS packets are publicly available and can be collected using an AIS receiver and decoded using [open-source software](https://github.com/astuder/dAISy). Real-time AIS vessel information is also accessible using services like [MarineTraffic](https://www.marinetraffic.com/).

When the Carolina Cartography Collective began planning for the opening of our physical exhibit in El Fortín, the museum's location at the top of hill presented a unique opportunity to set up our own [AIS tracking device](https://shop.wegmatt.com/products/daisy-2-dual-channel-ais-receiver-with-nmea-0183) and perform "citizen science" by gathering our own data about the movement of ferries through the Isabelle Segunda terminal. Our inital idea was that AIS data could be used to empirically demonstrate the reliability of the Vieques ferry service. While MarineTraffic provides free real-time information about vessel movement on their website, access to the services we'd need to programatically track several vessels over time would cost over $100 a month.

After running a few tests from the island, it became clear that an AIS receiver placed in El Fortín would reliabily gather AIS data from vessels in and around the Isabella Segunda terminal. Once this was clear, we were able to start brainstorming ways to use individual AIS packets and information published on the ferry service website to create a live visualization of ferry reliability as part of our exhibit.

![boat-tracker.jpg](/assets/vieques/boat-tracker.jpg)
*The "Boat Tracker" exhibit in El Fortín, showing arrivals and departures in real time*

**Process**  
After the initial idea for build our own "ferry tracker" was proposed, the first step forward was trying out an AIS receiver. It happens that I live less than a mile from the Mississippi River in New Orleans -- giant container ships pass by my house at least once an hour -- so it was easy to start testing the receiver in real time. Javier mailed a dAISy receiver to my house and we saw the first packets show up in my computer's terminal on a Zoom call together.

Once we knew the receiver was working, the next step towards tracking the Vieques ferry was to write a program that would save relevant AIS packets in a database. My programming experience is primarily with Javascript, so I got started trying to build a NodeJS program that could interface with the dAISy receiver, which uses [serial communication](https://en.wikipedia.org/wiki/Serial_communication) over USB. This wasn't hard to do after finding the [serialport](https://github.com/serialport/node-serialport) library. I pulled in another helpful library, [GeoGate Encoder](https://www.npmjs.com/package/ggencoder), to decode the serial messages into a JSON object that had the fields we cared about. Here's what a decoded AIS packet looks like:

```js
{
  "mmsi":"368038080",
  "aistype":1,
  "cog":50.6,
  "sog":2,
  "hdg":86,
  "navstatus":0,
  "lat":"18.159489",
  "lon":"-65.465683"
}
```

You might recognize the latitude and longitude fields. MMSI refers to the Maritime Mobile Service Identity, which is unique ID for an AIS transmitter -- in this case, it's essentially the name of the vessel. The other fields suggest which direction the ship is pointing and how fast it's moving. We only saved AIS packets whose MMSI matched the a vessel listed on the ferry website's tickets page. If you're curious about the fields in an AIS packet, there's an explanation of each one [here](https://api.vtexplorer.com/docs/response-ais.html).

Once this was all working, I connected a [Mongo](https://www.mongodb.com/home) database, and we were ready to test it out in Vieques when Javier travelled there a month or so before the exhibit opened. I called this software component the "vessel scanner". You can check it out on Github [here](https://github.com/carolina-cartography/boat-tracker/tree/main/vessel-scanner).

Once the software was working, the next step was an affordable hardware solution for the museum. We went with a [Raspberry Pi](https://www.raspberrypi.org/), a tiny, open source computer that costs as little as $35. My goal was to set things up so that whenever the Raspberry Pi was turned on, it would start running the latest version of the vessel scanner in the background. I used a platform called [Docker](https://en.wikipedia.org/wiki/Docker_(software)) to make this happen. The Raspberry Pi we set up in the museum was set to pull the latest version of the vessel scanner from my Docker respository every hour and restart the program if neccesary -- this way we'd be able to fix issues and makes updates without needing any access to the Raspberry Pi itself. I set this system up on my Raspberry Pi in New Orleans, sent a disk image to Javier, and after just a bit of troubleshooting we soon had a steady stream of AIS data from the boats in the water around Isabelle Segunda.

![boat-tracker1.jpg](/assets/vieques/boat-tracker1.jpg)
*Javier testing the AIS Receiver and the "vessel scanner" software from his computer for the first time*

While it would have been possible to simply list the departure and arrival times of boats in the Vieques ferry terminal, I was committed to presenting a visual comparison of when the ferry company website *said* a boat would arrive or depart and when it *actually* arrived or departed. Because the ferry schedules change over time, and because different boats are used for different trips on an ongoing basis, it wasn't enough to download a copy of the ferry schedule at the beginning of the exhibit and use that for a comparison. Instead, I figured out a way to scrape the ferry company's website, [PuertoRicoFerry.com](https://www.puertoricoferry.com/en/routes-schedules/ceiba-vieques/), and download a list of trips for a given day. The scraped data I gathered included an indicator of which ferry vessel was assigned to each trip. I wrote another NodeJS program to do the scraping, and called this one "ferry-scraper". You can check it out on Github [here](https://github.com/carolina-cartography/boat-tracker/tree/main/ferry-scraper).

![boat-tracker2.jpg](/assets/vieques/boat-tracker2.jpg)
*A list of ferries from Ceiba to Vieques on the PuertoRicoFerry.com website*

I set up a job on my server to run every evening and gather a list of trips and vessels for the next day. It would save this in the same Mongo database that we were storing the AIS data in. Now all that was left was a visualization.

*To be continued...*