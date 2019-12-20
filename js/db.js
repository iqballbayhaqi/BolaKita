var dbPromised = idb.open("BolaKita", 1, function(upgradeDb) {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("post_title", "post_title", { unique: false });
});

// save data
function saveForLater(data) {
    dbPromised
        .then(function(db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(data);
            store.put(data);
            return tx.complete;
        })
        .then(function() {
            console.log("Artikel berhasil di simpan.");
        });
}

// menampilkan data 
function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function(teams) {
                resolve(teams);
            });
    });
}

function deleteData(id) {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(function(db) {
                const tx = db.transaction("teams", "readwrite");
                const store = tx.objectStore("teams");
                return store.delete(parseInt(id))
            })
    })
}


function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(parseInt(id));
            })
            .then(function(data) {
                return resolve(data);
            });
    });
}