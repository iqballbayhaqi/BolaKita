var dbPromised = idb.open("BolaKita", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("articles", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("post_title", "post_title", { unique: false });
});

// save articles
function saveForLater(article) {
    dbPromised
        .then(function(db) {
            var tx = db.transaction("articles", "readwrite");
            var store = tx.objectStore("articles");
            console.log(article);
            store.add(article);
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
                var tx = db.transaction("articles", "readonly");
                var store = tx.objectStore("articles");
                return store.getAll();
            })
            .then(function(articles) {
                resolve(articles);
            });
    });
}


function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                console.log("db", db)
                var tx = db.transaction("articles", "readonly");
                console.log("tx", tx)
                var store = tx.objectStore("articles");
                console.log("store", store)
                console.log("return", store.get(id));
                return store.get(id);
            })
            .then(function(article) {
                console.log("final", resolve(article))
                return resolve(article);
            });
    });
}