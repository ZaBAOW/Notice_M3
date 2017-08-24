# Notice_M3 Readme
A chrome browser extension that connects to Twitches chat channels and notifies users of increased rate in chat messages that are sent to the channel.

Notice_M3's use:
The purpose of Notice_M3 is to help users know if something of note 
has occured on a twitch stream that they have running, but are not actively watching by reading 
the rate of chat message additions and sending the user a clickable notification as a shortcut to said stream.

How Notice_M3 parses Twitch chat:
Notice_M3 will read every twitch chat message created at the load time of the channel.  Results are 
measured in "messages/minute" (mpm).  After the threshold is set in the first minute of parsing 
Notice_M3 will then check its results every minute against the threshold, and will only notify the
user if that result is equal to or greater than the set threshold.

Future features to be added:
  - A timer that will set COUNT to 0 if THRESHOLD is not met within a timelimit.(added)
  - An algorithm that will test for messages/min and will set a THRESHOLD.(added)
  - actions of content scripts will resemble what buttons are active in popup window, when
   twitch stream is reloaded.
  - Local storage that will contain stream chat data (messages/minute)

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
- If you are not on a twitch webpage, the buttons in the popup window will
 become inactive signalling that the extension is not active on the current
 site.
- At the moment the first minute of counting is skewed due to the 50 initial
messages that load in simultaneoulsy when opening a stream.
- If you switch steams on the same tab, you have to reload the page for the 
app to re-execute signaled by the "Hi there!" notification.
- A "NOTICE ME!!!" notification will always appear after the first minute, as that is
when the threshold is set.
