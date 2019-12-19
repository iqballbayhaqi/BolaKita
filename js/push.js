var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BG430_k_wtrSlFhvToJcCqoBRBVU5fHc1AUkk7PzYdN2fek-b62Y1fT16Hi0-ShgzUgKItAZz0YplR7iqT9ySws",
    "privateKey": "UKSP-p7b7hUKWhjsx1UoTQygzHijgLd8oCPju0A2vME"
};


webPush.setVapidDetails(
    'mailto:baihaqiiqbal323@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dfWtH0FtISY:APA91bHAHLxh3sbTnnK6UWWYnMpIvF3yd_HIEDiQOGh3I-UAoVQ7IfvWJllTPiZCZNWbtKdir7ESB1fYQb1XMVpFJu5c5YnH6WjAP_ejZLhlx49oRrfM3Z8O6rpoWi6RLR_lSCELxmfT",
    "keys": {
        "p256dh": "BFA7cdGQNyMi6sZPResJM7CqmBNlh3uHhmczx9XpqAv8A+InrQuHs0Cj1/YwsH4k01zhUCrOqLOMAg0AyOgLbyc=",
        "auth": "Bqh65qzuxzHFlQBUNbYH6A=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '455305007862',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);