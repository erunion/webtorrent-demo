#!/usr/bin/env node
const parseTorrent = require('parse-torrent')
const createTorrent = require('create-torrent')
const fs = require('fs').promises;
const path = require('path');

const prog = path.basename(process.argv[1])
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`USAGE: ./${prog} <video file>\n`)
  process.exit(-1);
}

const trackers = [
  // wss:// trackers needed for browser streaming
  ['wss://tracker.btorrent.xyz'],
  ['wss://tracker.openwebtorrent.com'],
  ['wss://tracker.fastcast.nz'],

  // https://ngosang.github.io/trackerslist/trackers_best.txt
  ['udp://tracker.coppersurfer.tk:6969/announce'],
  ['udp://tracker.opentrackr.org:1337/announce'],
  ['udp://tracker.openbittorrent.com:80/announce'],
  ['udp://p4p.arenabg.com:1337/announce'],
  ['udp://9.rarbg.to:2710/announce'],
  ['udp://9.rarbg.me:2710/announce'],
  ['udp://exodus.desync.com:6969/announce'],
  ['udp://tracker.cyberia.is:6969/announce'],
  ['udp://retracker.lanta-net.ru:2710/announce'],
  ['udp://open.stealth.si:80/announce'],
  ['udp://tracker.torrent.eu.org:451/announce'],
  ['udp://tracker.tiny-vps.com:6969/announce'],
  ['udp://tracker.moeking.me:6969/announce'],
  ['udp://tracker3.itzmx.com:6961/announce'],
  ['http://tracker1.itzmx.com:8080/announce'],
  ['udp://ipv4.tracker.harry.lu:80/announce'],
  ['udp://bt2.archive.org:6969/announce'],
  ['udp://bt1.archive.org:6969/announce'],
  ['http://tracker.internetwarriors.net:1337/announce'],
  ['http://tracker.bt4g.com:2095/announce'],
];

const videoFile = args.shift();
console.log(`Creating a torrent for: ${videoFile}\n`)

createTorrent(videoFile, { announceList: trackers }, async (err, torrent) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }

  const torrentFile = `${videoFile}.torrent`

  await fs.writeFile(torrentFile, torrent);

  console.log(`🌀 Torrent: ${torrentFile}\n`);

  const magnet = parseTorrent.toMagnetURI(parseTorrent(torrent))
  console.log(`🧲 Magnet URI: ${magnet}\n`);

  /* const client = new WebTorrent();
  client.add(torrentFile, function (torrent) {

    process.exit();
  }) */
});
