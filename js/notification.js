function showNotifSave() {
    const title = 'BolaKita';
    const options = {
        'body': 'Data telah tersimpan.',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}

function showNotifDelete() {
    const title = 'BolaKita';
    const options = {
        'body': 'Data telah dihapus.',
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}