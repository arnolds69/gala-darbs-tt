//katrai kartei read more
document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.character-card'); // get the nearest card container
    const more = card.querySelector('.more-info');
    if (more.style.display === 'block') {
      more.style.display = 'none';
      btn.innerHTML = "<strong>Read More</strong>";

    } else {
      more.style.display = 'block';
      btn.textContent = 'Read Less';
    }
  });
});
function errordisplay(id, message) {
  document.getElementById(id).textContent = message;
}
function validateForm() {
  let valid = true;
  // aptaujas vertibas
  let steamid = document.getElementById("steamID").value;
  let day = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;
  let matchYes = document.getElementById("matchYes").checked;
  let matchNo = document.getElementById("matchNo").checked;
  let shooterYes = document.getElementById("shooterYes").checked;
  let shooterNo = document.getElementById("shooterNo").checked;
  //clear error
  document.querySelectorAll(".error").forEach(el => {
        el.replaceChildren();
    });
 

  // validation for form
  if (steamid === "") {
    errordisplay("steamid-error", "SteamID is required.");
    valid = false;
  }//else if (!steamid.includes("steamcommunity.com/profiles/")")){
    //errordisplay("steamid-error", "Steam URL must contain steamcommunity.com/profiles/") //w3 page nepienem '/' vai '\' simbolu
    //valid = false;
  //}

  if (day === "" || month === "" || year === "") {
    errordisplay("deadlockdate-error", "Complete date is required (day, month, year).");
    valid = false;
  } else {
    let dayNum = Number(day);
    let monthNum = Number(month);
    let yearNum = Number(year);

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      errordisplay("deadlockdate-error", "Day must be a number between 1 and 31.");
      valid = false;
    } else if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      errordisplay("deadlockdate-error", "Month must be a number between 1 and 12.");
      valid = false;
    } else if (isNaN(yearNum) || yearNum < 2024) {
      errordisplay("deadlockdate-error", "Has to be a number,  in or after 2024.(Cannot learn about deadlock, before it was leaked or announced)");
      valid = false;
    } else if (isNaN(yearNum) || yearNum > new Date().getFullYear()){
        errordisplay("deadlockdate-error", "Has to be a number, or cannot learn about deadlock in the future.")
      valid = false;
    }
  }
  if (!matchYes && !matchNo) {
    errordisplay("match-error", "Please select an option about match length.");
    valid = false;
  }
  if (!shooterYes && !shooterNo) {
    errordisplay("shooter-error", "Please select an option about shooter type games.");
    valid = false;
  }
  return valid; // false prevents submission
}
let chars = [];

const charForm = document.getElementById("charactersuggest").querySelector("form")
const charlist = document.getElementById("charlist");

charForm.addEventListener("submit", (e) => {
    e.preventDefault(); // savadak page restartejas katru reizi
    document.querySelectorAll(".error").forEach(el => {
        el.replaceChildren();
    });
    const name = document.getElementById("charname").value;
    const abilities = document.getElementById("charabb").value;
    const pic = document.getElementById("charpic").value;
    const allowed = [".jpg", "jpeg", ".png", ".gif", ".svg"];
	  const last4 = pic.slice(-4).toLowerCase();
    Valid = true;


    if (name == ""){
      errordisplay("char-error", "Name cannot be empty!")
      Valid = false;
    }
    if (abilities == ""){
      errordisplay("charabb-error", "Abilities cannot be empty!")
      Valid = false;
    }
    
    if (!allowed.includes(last4)) {
      errordisplay("charpic-error", "Picture url is not jpeg,.png,.gif or .svg.");
      Valid = false;
    }
    if (pic == ""){
      errordisplay("charpic-error", "Picture URL cannot be empty!")
      Valid = false;
    }
    if(Valid){
      const char = { charname: name, charabb: abilities, charpic: pic };
      chars.push(char);
      renderchar();
    }
  })
function createchar(chare){
    const char = document.createElement("div");
    char.classList.add("char-card");
    const img = document.createElement("img");
    img.src = chare.charpic;
    img.alt = chare.charname;
    img.style.width = "88px";
    img.style.height = "119px";
    const charname = document.createElement("h3");
    charname.textContent = "Name : " + chare.charname;
    const charabb = document.createElement("p");
    charabb.textContent = "Abilities : " + chare.charabb;
    char.append(img, charname, charabb);
    return char;
}
function renderchar() {
  charlist.innerHTML = "";
	chars.forEach(char =>{
		const card = createchar(char);
		charlist.appendChild(card);
	})
}

