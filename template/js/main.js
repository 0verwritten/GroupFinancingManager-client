window.onload = async () => {
  const sidebar = document.querySelector(".sidebar-container");
  const toggleButton = document.querySelector(".toggle-button");

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  const API_LOCATION = "http://localhost:9090";

  const api_fetch = (url, method, body) => {
    let headers = {};
    if (localStorage.accessToken) {
      headers = {
        Authorization: `Bearer ${localStorage.accessToken}`,
        Accept: "application/json",
      };
    }
    if (method === "POST") {
      headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }
    return window.fetch(`${API_LOCATION}/${url}`, {
      // withCredentials: localStorage.accessToken != null,
      method,
      headers,
      body: JSON.stringify(body),
    });
  };

  const fetch_json = async (query) => {
    const res = await api_fetch(query, "GET");

    if (res.status === 200) {
      return res.json();
    }

    return null;
  };

  const signInForm = document.querySelector("#signin");

  if (signInForm) {
    signInForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(signInForm);

      api_fetch(
        `user/login?${Array.from(form.entries())
          .map((item) => `${item[0]}=${item[1]}`)
          .join("&")}`,
        "GET"
      ).then((res) => {
        res.json().then((json) => {
          if (res.status !== 200) {
            signInForm[1].setCustomValidity(json.message);
            signInForm[1].reportValidity();
            signInForm[1].addEventListener("input", (e) => {
              e.target.setCustomValidity("");
            });
          } else {
            localStorage["accessToken"] = json.accessToken;
            location.pathname = "account.html";
          }
        });
      });
    });
  }

  const signUpForm = document.querySelector("#signup");

  if (signUpForm) {
    signUpForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = Object.fromEntries(new FormData(signUpForm));
      console.log(form);
      if (form['password'] != form['repassword']){
        signUpForm[signUpForm.length - 2].setCustomValidity('Passwords doesn\'t match');
        signUpForm[signUpForm.length - 2].addEventListener("input", (e) => {
          e.target.setCustomValidity("");
        });
        signUpForm[signUpForm.length - 1].reportValidity();
        return;
      }

      api_fetch(`user`, "POST", form).then((res) => {
        res.json().then((json) => {
          if (res.status !== 200) {
            signUpForm[signUpForm.length - 2].setCustomValidity(json.message);
            signUpForm[signUpForm.length - 2].reportValidity();
            signUpForm[signUpForm.length - 2].addEventListener("input", (e) => {
              e.target.setCustomValidity("");
            });
          } else {
            console.info("successfully signed up");
            location.pathname = "signin.html";
          }
        });
      });
    });
  }

  const accountProfile = document.querySelector("#account-profile");

  if (accountProfile) {
    const user_data = await fetch_json("user");

    accountProfile.querySelector(
      "#name"
    ).innerHTML = `${user_data.first_name} ${user_data.last_name}`;
    accountProfile.querySelector("#email").innerHTML = user_data.email;
    accountProfile.querySelector("#card-number").innerHTML =
      user_data.card_number;
  }

  const groupsList = document.querySelector("#group-list");

  if (groupsList) {
    const group_data = await fetch_json("group/list");

    groupsList.innerHTML = "";
    group_data.forEach((item) => {
      const link = document.createElement("a");
      link.href = "/group.html";
      link.innerText = item.name;
      const li = document.createElement("li");
      li.appendChild(link);
      groupsList.appendChild(li);
    });
  }

  const groupCreateForm = document.querySelector("#new-group");

  if (groupCreateForm) {
    groupCreateForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const res = await api_fetch(
        "group",
        "POST",
        Object.fromEntries(new FormData(groupCreateForm))
      );

      if (res.status === 200) {
        const data = await res.json();
        alert(`Here is your secret key: ${data.secret_key}`);
        location.pathname = `group.html`;
      }
    });
  }
};
