This is a demo for the [https://webtorrent.io/](https://webtorrent.io/) streaming torrent technology.

You can fire up this local test webserver by running:

```
npm install
node server.js
```

This'll fire up a local server at http://localhost:3000 that will attempt to start playing a torrent-hosted trailer for **The Last Man on Earth (1964)**.

## Creating a new torrent file
You can use the `prepare-for-hosting.js` program here to create a new torrent file for a given video.

```shell
$ ./prepare-for-hosting.js The\ Last\ Man\ On\ Earth\ \(1964\)\ -\ Trailer.mp4
Creating a torrent for: The Last Man On Earth (1964) - Trailer.mp4

🌀 Torrent: The Last Man On Earth (1964) - Trailer.mp4.torrent

🧲 Magnet URI: magnet:?xt=urn:btih:106ea4ff4b0ad0964e4045d592bd4062092fd873&dn=The+Last+Man+On+Earth+(1964)+-+Trailer.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fretracker.lanta-net.ru%3A2710%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker3.itzmx.com%3A6961%2Fannounce&tr=http%3A%2F%2Ftracker1.itzmx.com%3A8080%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fbt2.archive.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.bt4g.com%3A2095%2Fannounce
```

You can then upload `The Last Man On Earth (1964) - Trailer.mp4` to your torrent server. Once that file is present on the server, you can add `The Last Man On Earth (1964) - Trailer.mp4.torrent` into your torrent client and it should pick up that you already have the file present and ready to seed.

## What works
Well the Webtorrent tech definitely works, but curently I'm only able to get it working through their desktop app: https://webtorrent.io/desktop/

Go through the normal steps above for creating and hosting a torrent file, and drop that torrent file into this desktop app it'll start to play the video after buffering a bit.

Doesn't really solve your problem, though, since it'd need users to either only consume these films through their own video clients after downloading the torrent, or stream it through this desktop app.

## What doesn't

MKV and AVI video containers don't seem to work all that great, so it's probably best if the video is an MP4.

### udp:// problems in the browser
`udp://` trackers don't work at all in the browser ([webtorrent/webtorrent#1467](https://github.com/webtorrent/webtorrent/issues/1467)), so it needs the `wss://` trackers in the torrent file to work. Problem with this though is that in order for the video player to work, it seems that other users need to have the video open and streaming already in order to seed it to other users in the browser.

This is kind of a chicken and the egg situation and I'm not really sure, based off their examples, how to even serve a new file to other users for streaming in the browser. I have a torrent running in the torrent client (ruTorrent) on my seedbox, and that's seeding fine when I open up the torrent in https://webtorrent.io/desktop/, but it never wants to play in the browser because it can never find any seeds.

### Magnet problems
I can't seem to get the web client to recognize magnet URIs at all. Not sure if this is because of the `udp://` problem or what, since it'd need to pull down info on the torrent from those peers and seeds first before knowing what it's doing. It can handle `.torrent` files just fine though.

This means that you might need to host `.torrent` files in order for this to work right.
