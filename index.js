let userData = []; // pour passer mes données dans une boite, userdata = data.results

// logic pour aller chercher les données users
const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));

  console.log(userData[0]); // avant de loggé, tu await le fetch completement
};

// affichage des users
const userDisplay = async () => {
  await fetchUser(); // appeler quand on a besoin de userDisplay // await avant de commencer le map

  // traiter les dates en ISO
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long", // en entier
      day: "numeric",
    });
    return newDate;
  };

  // calculer la différence, membre depuis...
  const dayCalc = (date) => {
    let today = new Date(); // new Date() dans une variable, vous produit la date du jour
    let todayTimestamp = Date.parse(today); // la date du jour en timestamp
    let timestamp = Date.parse(date); // passer la date ISO en timestamp (nbre de milliseconds écoulé depuis 1970)

    return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
  };

  document.body.innerHTML = userData
    .map(
      (user) =>
        `
        <div class="card">
        <img src=${user.picture.large} alt="photo de ${user.name.last}">
  <h3>${user.name.first} ${user.name.last}</h3>
  <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
  <em>Membre depuis : ${dayCalc(user.registered.date)} jours</em>
  </div>
  `
    )
    .join("");
};

userDisplay();
