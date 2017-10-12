# Notice_M3 Readme
A chrome browser extension that connects to Twitches chat channels and notifies users of increased rate in chat messages that are sent to the channel.

DISCLAIMER: Twitch is currently beta testing a newer version of the twitch UI.  Notice_M3 currently does not work
on the beta version of twitch.  If you have the beta version active, but want Notice_M3 to work, simply open the
drop down menu with the arrow located in the top right corner of the window, and uncheck the box next to "beta site".
This will bring you back to the original version of the site and Notice_me will work.

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
  - Enable/Disable buttons in the popup window will be merged into one button
    in order to simplify the contents of the window.
  - An object array containing multiple messages that can appaer in the notifyme
    notification to keep notification from becoming stale.

Installment Intructions:
1. Clone/Download files from the repository into a file you can find.
    - For those who do not know how to clone/download a repo here is a link to a
      tutorial (https://help.github.com/articles/cloning-a-repository/).
    - git bash is required for this step, here is the link to download the
      software (https://git-scm.com/downloads).
2. Open google chrome go to extension manager page (chrome://extensions).
3. Check Developer mode box at the top of the page
4. Click "Load unpacked extension..." button.
5. Find the folder you put the files into and press "ok".
6. Counter extension should pop up in the extensions list.
7. enable extension and you're done.

Notes: 
- This extension will only work on any website with the domain
"twitch.tv".  This means that it will be active on any page of
the twitch website.
- If you are not on a twitch webpage, the buttons in the popup window will
 become inactive signalling that the extension is not active on the current
 site.
- The application will only be able to parse twitch chant if chat is open in the
window.  Closing the chat window will cause the page to stop creating new twitch message
elements which the app looks for. Ultimately this will cause a discrepancy in the app's
threshold value.
    - If a discrepancy in the threshold value is noticed, use the "reset threshold" button
      in the popup window.
- At the moment the first minute of counting is skewed due to the 50 initial
messages that load in simultaneoulsy when opening a stream.
- Disabling the application via the button in the popup window, will only disable
the applications ability to send notifications, not its ability to parse twitch chat
- If you switch steams on the same tab, you have to reload the page for the 
app to re-execute signaled by the "Hi there!" notification.
- A "NOTICE ME!!!" notification will always appear after the first minute, as that is
when the threshold is set.
- When switching the app from disabled to enabled, the page will have to be reloaded
to get the app to actually re-enable.
