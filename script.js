(function () {
  "use strict";

  // CREDIT: MURKHO KOBI
  const config = {
    k: "https://githubusercontent.com",
    r: "https://githubusercontent.com",
    t: "https://githubusercontent.com",
    s: "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#02040a;color:#fff;padding:25px;border-radius:12px;z-index:2147483647;font-family:sans-serif;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.8);border:2px solid #00ffcc;width:280px;box-sizing:border-box;"
  };

  (async function () {
    // REMOVE EXISTING AUTH BOX IF PRESENT
    const existingBox = document.getElementById("zxi-auth-box");
    if (existingBox) {
      existingBox.remove();
    }

    // CREATE AUTH BOX WITH YOUR NAME
    const authBox = document.createElement("div");
    authBox.id = "zxi-auth-box";
    authBox.style.cssText = config.s;
    authBox.innerHTML = `
      <h3 style="margin:0 0 10px 0;color:#00ffcc;font-size:18px;letter-spacing:1px;font-weight:bold;">MURKHO KOBI</h3>
      <p style="margin:0 0 15px 0;color:#64748b;font-size:11px;">ENTER LICENSE KEY</p>
      <input type="text" id="zxi-key-input" placeholder="ENTER KEY HERE"
        style="width:100%;padding:10px;margin-bottom:15px;border:1px solid #00ffcc;border-radius:6px;background:#070b19;color:#fff;text-align:center;box-sizing:border-box;font-size:13px;outline:none;">
      <button id="zxi-login-btn"
        style="width:100%;background:#00ffcc;color:#000;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px;margin-bottom:10px;">VERIFY</button>
      <button id="zxi-telegram-btn"
        style="width:100%;background:#229ED9;color:#fff;border:none;padding:12px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px;">TELEGRAM MURKHO KOBI</button>
      <div id="zxi-status" style="margin-top:12px;font-size:12px;font-weight:bold;color:#64748b;">READY</div>
    `;
    document.body.appendChild(authBox);

    // RESPONSIVE ADJUSTMENT
    setTimeout(() => {
      authBox.style.zIndex = "2147483647";
      if (window.innerWidth < 600) {
        authBox.style.width = "90%";
        authBox.style.maxWidth = "280px";
      }
    }, 10);

    const loginBtn = document.getElementById("zxi-login-btn");
    const telegramBtn = document.getElementById("zxi-telegram-btn");
    const keyInput = document.getElementById("zxi-key-input");
    const statusDiv = document.getElementById("zxi-status");

    // TELEGRAM BUTTON
    telegramBtn.addEventListener("click", async () => {
      try {
        const res = await fetch(config.t + "?t=" + Date.now());
        const url = (await res.text()).trim();
        if (url.startsWith("http")) {
          window.open(url, "_blank");
        }
      } catch (err) {}
    });

    // LOGIN BUTTON
    loginBtn.addEventListener("click", async () => {
      const inputKey = keyInput.value.trim();

      if (!inputKey) {
        statusDiv.innerHTML = "<span style='color:#ff4444;'>PLEASE INPUT KEY!</span>";
        return;
      }

      statusDiv.innerHTML = "<span style='color:#00ffcc;'>CONNECTING SERVER...</span>";
      loginBtn.disabled = telegramBtn.disabled = true;

      try {
        // FETCH AND VALIDATE KEY
        const res = await fetch(config.k + "?t=" + Date.now());
        const text = await res.text();
        const keys = text.split("\n").map(k => k.trim()).filter(k => k !== "");

        if (keys.includes(inputKey)) {
          statusDiv.innerHTML = "<span style='color:#00ffcc;'>KEY VALIDATED! ✓</span>";

          setTimeout(async () => {
            authBox.remove();

            // LOADING OVERLAY
            const overlay = document.createElement("div");
            overlay.style.cssText = `
              position:fixed; top:0; left:0; width:100%; height:100%;
              background:rgba(2,4,10,0.85); z-index:2147483647;
              display:flex; align-items:center; justify-content:center;
              font-family:sans-serif;
            `;
            overlay.innerHTML = `
              <div style="text-align:center; background:#02040a; padding:30px; border-radius:12px; border:2px solid #00ffcc; box-shadow:0 10px 30px rgba(0,0,0,0.8); width:280px;">
                <div style="width:50px; height:50px; border:5px solid #1a2338; border-top:5px solid #00ffcc; border-radius:50%; margin:0 auto 20px auto; animation:zxi-spin 1s linear infinite;"></div>
                <p id="zxi-check-text" style="color:#00ffcc; font-size:16px; font-weight:bold; margin:0; letter-spacing:1px;">CHECKING UPDATE...</p>
              </div>
              <style>
                @keyframes zxi-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              </style>
            `;
            document.body.appendChild(overlay);

            // CHECK FOR UPDATE
            let updated = false;
            try {
              const checkRes = await fetch("https://workers.dev");
              const checkText = await checkRes.text();
              if (checkText.includes("GitHub Updated")) {
                updated = true;
              }
            } catch (e) {}

            await new Promise(r => setTimeout(r, 5000));

            const checkTextEl = document.getElementById("zxi-check-text");
            if (updated) {
              checkTextEl.innerHTML = "<span style='color:#00ffcc;'>Link Updated Successfully! ✓</span>";
            } else {
              checkTextEl.innerHTML = "<span style='color:#ff4444;'>No Update Available!</span>";
            }

            await new Promise(r => setTimeout(r, 1500));
            overlay.remove();

            // FETCH REDIRECT URL
            const redRes = await fetch(config.r + "?t=" + Date.now());
            const redirectUrl = (await redRes.text()).trim();

            if (redirectUrl.startsWith("http")) {
              const cdOverlay = document.createElement("div");
              cdOverlay.style.cssText = `
                position:fixed; top:0; left:0; width:100%; height:100%;
                background:rgba(2,4,10,0.02); z-index:2147483647;
                display:flex; align-items:center; justify-content:center;
              `;

              const randomTime = Math.floor(Math.random() * 4) + 22;
              cdOverlay.innerHTML = `
                <div style="text-align:center;">
                  <div style="position:relative; width:220px; height:220px; margin:0 auto;">
                    <svg width="220" height="220" style="transform:rotate(-90deg);">
                      <circle cx="110" cy="110" r="98" fill="none" stroke="#1a2338" stroke-width="18"></circle>
                      <circle id="progress" cx="110" cy="110" r="98" fill="none"
                        stroke="#00ffcc" stroke-width="18"
                        stroke-dasharray="615" stroke-dashoffset="615"
                        stroke-linecap="round"></circle>
                    </svg>
                    <div id="countdown-text" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:46px; font-weight:bold; color:#00ffcc;">${randomTime}</div>
                  </div>
                  <p style="margin-top:25px; color:#00ffcc; font-size:18px; font-weight:bold;">REDIRECTING...</p>
                </div>
              `;
              document.body.appendChild(cdOverlay);

              let timeLeft = randomTime;
              const progressCircle = cdOverlay.querySelector("#progress");
              const countdownText = cdOverlay.querySelector("#countdown-text");

              const timer = setInterval(() => {
                timeLeft--;
                countdownText.textContent = timeLeft;
                const offset = 615 - (615 * (randomTime - timeLeft)) / randomTime;
                progressCircle.style.strokeDashoffset = offset;

                if (timeLeft <= 0) {
                  clearInterval(timer);
                  window.location.href = redirectUrl;
                }
              }, 1000);
            }
          }, 1500);
        } else {
          statusDiv.innerHTML = "<span style='color:#ff4444;'>INVALID KEY!</span>";
          loginBtn.disabled = telegramBtn.disabled = false;
        }
      } catch (err) {
        statusDiv.innerHTML = "<span style='color:#ff4444;'>SERVER ERROR!</span>";
        loginBtn.disabled = telegramBtn.disabled = false;
      }
    });
  })();
})();
