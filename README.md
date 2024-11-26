# FrameGrab

A Chrome Extension that allows you to save any video's frame as a PNG image.

<a href="https://chrome.google.com/webstore/detail/ublock-origin/gjollkpcmnigdfnkdhkpgjbiahgijghc"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get FrameGrab for Chromium"></a>

### NOTE: After installing the extension, keyboard shortcuts should be added at `chrome://extensions/shortcuts`. See the [Configuration](#configuration) section for more info!

## Table of Contents

1. [Features](#features)
1. [Screenshot](#screenshot)
1. [Installation and Configuration](#installation-and-configuration)
    1. [Chrome Web Store](#chrome-web-store)
    1. [Manual Installation](#manual-installation)
    1. [Configuration](#configuration)
1. [Future Plans](#future-plans)
1. [References](#references)
1. [Licensing](#licensing)

## Features

- Save Frame Context Menu (when right clicking on a video)
- Keyboard Shortcut actions:
    - Download Current Frame
    - Open Current Frame in New Tab
    - Open Current Frame in New Background Tab
        - Same as previous function, except switches back to the current video tab
    - Toggle Speed to 0
        - For videos where this extension may fail, this function sets the video's speed to 0, which simulates pausing
          without changing the video playback UI
- Works on Chromium-based browsers, including Google Chrome, Brave, and Microsoft Edge
- Current Frame window:
    - Download frame with button
    - Copy frame to clipboard by in context (right click) menu

## Screenshot

![Image 1](https://user-images.githubusercontent.com/10486660/167356604-3e855a1e-4dc8-4dd6-a875-54ae1f72593c.png)

## Installation and Configuration

### Chrome Web Store

1. Go [here](https://chrome.google.com/webstore/detail/framegrab/gjollkpcmnigdfnkdhkpgjbiahgijghc) to find the extension
   on the Chrome Web Store
2. Click "Add to Chrome"
3. Configure the extension below

### Manual Installation

1. Download or clone this repo into a folder
2. Go to `chrome://extensions/`
3. Make sure "Developer mode" is enabled (top right corner)
4. Drag the folder anywhere onto this page

### Configuration

1. Navigate to `chrome://extensions/shortcuts`
2. Find FrameGrab in the list of extensions
3. Click on the edit icon for each of the functions
4. Press a shortcut combination to set that function's shortcut

## Future Plans

- Add a dedicated preferences page to configure keyboard shortcuts
- Improve support for certain videos that use blob URLs

## References

- [Manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Open Web JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

## Licensing

### FrameGrab is licensed under the terms of the GNU GPLv3 license.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
