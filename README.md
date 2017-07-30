# Notice_M3 Readme
A chrome browser extension that connects to Twitches chat channels and notifies users of increased rate in chat messages that are sent to the channel.

Notice_M3's use:
The purpose of Notice_M3 is to help users know if something of note 
has occured on a twitch stream that they have running, but are not actively watching by reading 
the rate of chat message additions and sending the user a clickable notification as a shortcut to said stream.

Future features to be added:
  - A timer that will set COUNT to 0 if THRESHOLD is not met within a timelimit.
  - An algorithm that will test for messages/min and will set a THRESHOLD.
      - Will need to create ranges for THRESHOLD, ergo will need to research via another application.

Installment Intructions:
1. Clone/Download files from the repository into a file you can find.
2. Open google chrome go to extension manager page (chrome://extensions).
3. Check Developer mode box at the top of the page
4. Click "Load unpacked extension..." button.
5. Find the folder you put the files into and press "ok".
6. Counter extension should pop up in the extensions list.
7. enable extension and you done.

Notes: 
- This extension will only work on twitch streams, it will not activate
on any other page on twitch (i.e. directory, products, settings).
- At the moment the first minute of counting is skewed due to the 50 initial
messages that load in simultaneoulsy when opening a stream.
