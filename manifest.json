{
  "manifest_version": 2,

  "name": "Counter",
  "short_name": "Counter",
  "description": "Count Messages as they appear",
  "version": "0.01",
  "background": {
    "scripts": ["checkIfTwitch.js"],
    "persistent": false
  },
  "page_action": {
    "default_title": "twitch_message_count"
  },
  "content_scripts": [
    {
      "matches": ["https://www.twitch.tv/*"],
      "js": [
        "jquery-3.1.1.slim.min.js",
        "main.js"
      ],
      "exclude_globs": ["https://www.twitch.tv/directory/*",
        "https://www.twitch.tv/p/*",
        "https://www.twitch.tv/products/*",
        "https://www.twitch.tv/*/manager*",
        "https://www.twitch.tv/*/dashboard",
        "https://www.twitch.tv/broadcast",
        "https://www.twitch.tv/messages/*",
        "https://www.twitch.tv/settings"
      ],
      "run_at": "document_end"
    }
  ],
  "web_accessible_resources": [
    "assets/bard.png"
  ],
  "permissions": [
    "activeTab"
  ]
}