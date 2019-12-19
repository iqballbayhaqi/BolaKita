var base_url = "https://api.football-data.org/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
    if ("caches" in window) {
        caches
            .match(base_url + "v2/competitions/2001/standings")
            .then(function(response) {
                    if (response) {
                        response.json().then(function(res) {
                                    const dataTable = res.standings
                                        .filter(({ type }) => type === "TOTAL")
                                        .map(value => {
                                                return `
          <h5>${value.group.replace("_", " ")}</h5>
          <table class="responsive-table striped grey darken-4" style="color:white;">
            <thead>
              <tr>
                <th>Team</th>
                <th>MP</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
            ${value.table
              .map(data => {
                return `
              <tr>
                <td style="display:flex;" >
                  <p style="padding-right:10px">${data.position}</p>
                  <img class="img-responsive" src="${data.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="25px" />
                  <a href="./article.html?id=${data.team.id}" style="color:white;"><p style="padding-left: 10px">${data.team.name}</p></a>
                </td>
                <td>${data.playedGames}</td>
                <td>${data.won}</td>
                <td>${data.draw}</td>
                <td>${data.lost}</td>
                <td>${data.goalsFor}</td>
                <td>${data.goalsAgainst}</td>
                <td>${data.goalDifference}</td>
                <td>${data.points}</td>
              </tr>
              `;
              })
              .join(" ")} 
            </tbody>
          </table>
            `;
              });
            document.getElementById(
              "data-standings"
            ).innerHTML = dataTable.join(" ");
            document.getElementById("competition").innerHTML =
              res.competition.name;
            document.getElementById(
              "date"
            ).innerHTML = `${res.season.startDate} / ${res.season.endDate}`;
          });
        }
      });
  }

  fetch(base_url + "v2/competitions/2001/standings", {
    method: "GET",
    headers: { "X-Auth-Token": "7fa12231075a40f9a260585a31558f8c" }
  })
    .then(status)
    .then(json)
    .then(function(res) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      const dataTable = res.standings
        .filter(({ type }) => type === "TOTAL")
        .map(value => {
          return `
          <h5>${value.group.replace("_", " ")}</h5>
          <table class="responsive-table striped grey darken-4" style="color:white;">
            <thead>
              <tr>
                <th>Team</th>
                <th>MP</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
            ${value.table
              .map(data => {
                return `
              <tr>
                <td style="display:flex;" >
                  <p style="padding-right:10px">${data.position}</p>
                  <img class="img-responsive" src="${data.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="25px" />
                  <a href="./article.html?id=${data.team.id}" style="color:white;"><p style="padding-left: 10px">${data.team.name}</p></a>
                </td>
                <td>${data.playedGames}</td>
                <td>${data.won}</td>
                <td>${data.draw}</td>
                <td>${data.lost}</td>
                <td>${data.goalsFor}</td>
                <td>${data.goalsAgainst}</td>
                <td>${data.goalDifference}</td>
                <td>${data.points}</td>
              </tr>
              `;
              })
              .join(" ")} 
            </tbody>
          </table>
            `;
        });
      document.getElementById("data-standings").innerHTML = dataTable.join(" ");
      document.getElementById("competition").innerHTML = res.competition.name;
      document.getElementById(
        "date"
      ).innerHTML = `${res.season.startDate} / ${res.season.endDate}`;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
  
    if ("caches" in window) {
      caches.match(base_url + `v2/teams/${idParam}`).then(function(response) {
        if (response) {
          response.json().then(function(res) {
            const dataTeam = `
            <div class="row">
              <div class="col s12">
                <div class="card">
                  <div class="card-image">
                    <img class="responsive-img" src=${res.crestUrl}>
                  </div>
                  <div class="card-content">
                    <span class="card-title">${res.name}</span>
                    <p>Address : ${res.address}</p>
                    <p>Email : ${res.email}</p>
                    <p>Phone : ${res.phone}</p>
                    <p>Website : <a href=${res.website} target="_blank">${
                  res.website
                }</a></p>
                    <p>Competitions : </p>
                    <ul>
                      ${res.activeCompetitions
                        .map(data => {
                          return `<li>${data.name}</li>`;
                        })
                        .join(" ")}
                    </ul>
                    <p>Squad :</p>
                    <table class="responsive-table striped">
                      <thead>
                        <tr>
                            <th>Shirt Number</th>
                            <th>Name</th>
                            <th>Position</th>
                        </tr>
                      </thead>
                      <tbody>
                      ${res.squad
                        .map(data => {
                          return `
                        <tr>
                          <td>${
                            data.shirtNumber === null ? "none" : data.shirtNumber
                          }</td>
                          <td>${data.name}</td>
                          <td>${data.role === "COACH" ? "COACH" : data.position}</td>
                        </tr>
                        `;
                        })
                        .join(" ")}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("data-team").innerHTML = dataTeam;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(res);
          });
        }
      });
    }
  
    fetch(base_url + `v2/teams/${idParam}`, {
      method: "GET",
      headers: { "X-Auth-Token": "7fa12231075a40f9a260585a31558f8c" }
    })
      .then(status)
      .then(json)
      .then(function(res) {
        console.log(res)
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // Menyusun komponen card artikel secara dinamis
        const dataTeam = `
            <div class="row">
              <div class="col s12">
                <div class="card">
                  <div class="card-image">
                    <img class="responsive-img" src=${res.crestUrl.replace(/^http:\/\//i, 'https://')}>
                  </div>
                  <div class="card-content">
                    <span class="card-title">${res.name}</span>
                    <p>Address : ${res.address}</p>
                    <p>Email : ${res.email}</p>
                    <p>Phone : ${res.phone}</p>
                    <p>Website : <a href=${res.website} target="_blank">${
                  res.website
                }</a></p>
                    <p>Competitions : </p>
                    <ul>
                      ${res.activeCompetitions
                        .map(data => {
                          return `<li>${data.name}</li>`;
                        })
                        .join(" ")}
                    </ul>
                    <p>Squad :</p>
                    <table class="responsive-table striped">
                      <thead>
                        <tr>
                            <th>Shirt Number</th>
                            <th>Name</th>
                            <th>Position</th>
                        </tr>
                      </thead>
                      <tbody>
                      ${res.squad
                        .map(data => {
                          return `
                        <tr>
                          <td>${
                            data.shirtNumber === null ? "none" : data.shirtNumber
                          }</td>
                          <td>${data.name}</td>
                          <td>${data.role === "COACH" ? "COACH" : data.position}</td>
                        </tr>
                        `;
                        })
                        .join(" ")}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("data-team").innerHTML = dataTeam;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(res);
      });
  })
}

// ambil data dari DB
function getSavedArticles() {
  getAll().then(function(articles) {
    var articlesHTML = "";
    articles.forEach(function(article) {
      articlesHTML += `
      <table>
        <tr id=${article.id}>
            <td><img src=${article.crestUrl.replace(/^http:\/\//i, 'https://')} style="width: 100px;" /></td>
            <td>${article.shortName}</td>
            <td>
              <a 
              class="waves-effect light-blue accent-3 btn-small" 
              href="./article.html?id=${article.id}&saved=true"
              >
                OPEN
              </a>
            <a 
              class="waves-effect red darken-1 btn-small" 
              onclick="deleteBtn(${article.id})">
            <i class="material-icons">delete</i>
            </a>
            </td>
          </tr>
      </table>
      `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

const deleteBtn = (id) => {
  deleteData(id);
  showNotifDelete();
  document.getElementById(id).style.display = "none";
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  var articleHTML = "";
  getById(idParam).then(res => {
    const dataTeam = `
            <div class="row">
              <div class="col s12">
                <div class="card">
                  <div class="card-image">
                    <img class="responsive-img" src=${res.crestUrl.replace(/^http:\/\//i, 'https://')}>
                  </div>
                  <div class="card-content">
                    <span class="card-title">${res.name}</span>
                    <p>Address : ${res.address}</p>
                    <p>Email : ${res.email}</p>
                    <p>Phone : ${res.phone}</p>
                    <p>Website : <a href=${res.website} target="_blank">${
                  res.website
                }</a></p>
                    <p>Competitions : </p>
                    <ul>
                      ${res.activeCompetitions
                        .map(data => {
                          return `<li>${data.name}</li>`;
                        })
                        .join(" ")}
                    </ul>
                    <p>Squad :</p>
                    <table class="responsive-table striped">
                      <thead>
                        <tr>
                            <th>Shirt Number</th>
                            <th>Name</th>
                            <th>Position</th>
                        </tr>
                      </thead>
                      <tbody>
                      ${res.squad
                        .map(data => {
                          return `
                        <tr>
                          <td>${
                            data.shirtNumber === null ? "none" : data.shirtNumber
                          }</td>
                          <td>${data.name}</td>
                          <td>${data.role === "COACH" ? "COACH" : data.position}</td>
                        </tr>
                        `;
                        })
                        .join(" ")}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("data-team").innerHTML = dataTeam;
});
}