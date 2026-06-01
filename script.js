(function() {
    'use strict';

    // ১. প্যানেলের সুন্দর ডিজাইন (CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        #my-auth-panel {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: #0d1117; border: 2px solid #00ffaa; border-radius: 12px;
            padding: 25px; width: 320px; text-align: center; font-family: 'Segoe UI', sans-serif;
            box-shadow: 0px 0px 25px rgba(0, 255, 170, 0.3); z-index: 10000; color: #fff;
        }
        #my-auth-panel h2 { color: #00ffaa; font-size: 20px; margin-bottom: 5px; letter-spacing: 1px; }
        #my-auth-panel p { color: #8b949e; font-size: 11px; margin-bottom: 15px; }
        #my-auth-panel input {
            width: 90%; padding: 10px; background: #161b22; border: 1px solid #30363d;
            border-radius: 6px; color: #fff; text-align: center; font-size: 14px; margin-bottom: 15px;
        }
        #my-auth-panel button {
            width: 97%; padding: 12px; background: #00ffaa; border: none; border-radius: 6px;
            color: #0d1117; font-weight: bold; font-size: 14px; cursor: pointer; transition: 0.2s;
        }
        #my-auth-panel button:hover { background: #00cc88; box-shadow: 0 0 10px rgba(0,255,170,0.5); }
        #my-timer { font-size: 48px; font-weight: bold; color: #00ffaa; margin: 20px 0; }
        #my-status { color: #00ffaa; font-weight: bold; font-size: 12px; letter-spacing: 1px; }
    `;
    document.head.appendChild(style);

    // ২. স্ক্রিনে প্যানেলের মূল বক্সটি তৈরি করা
    const panel = document.createElement('div');
    panel.id = 'my-auth-panel';
    panel.innerHTML = `
        <h2>MY SYSTEM AUTH</h2>
        <p>ENTER LICENSE KEY</p>
        <div id="auth-content">
            <input type="text" id="license-input" placeholder="ENTER KEY HERE">
            <button id="verify-btn">VERIFY & RUN</button>
        </div>
    `;
    document.body.appendChild(panel);

    // ৩. VERIFY & RUN বোতামের কাজ
    document.getElementById('verify-btn').addEventListener('click', function() {
        const inputKey = document.getElementById('license-input').value.trim();

        if (inputKey.toLowerCase() === 'alone' || inputKey.toLowerCase() === 'open') {
            startBypassProcess();
        } else {
            alert('Invalid License Key! Try again.');
        }
    });

    // ৪. ব্যাকগ্রাউন্ডে এপিআই দিয়ে ৫টি ধাপ একবারে বাইপাস করার ফাংশন
    function startBypassProcess() {
        const content = document.getElementById('auth-content');
        content.innerHTML = `
            <div id="my-timer">20</div>
            <div id="my-status">BYPASSING ALL STEPS...</div>
        `;

        let timeLeft = 20; 
        const countdown = setInterval(function() {
            timeLeft--;
            document.getElementById('my-timer').textContent = timeLeft;
            if (timeLeft <= 0) clearInterval(countdown);
        }, 1000);

        // বর্তমান লিঙ্কটি নিয়ে ফ্রি বাইপাস এপিআই সার্ভারে পাঠানো হচ্ছে
        let currentUrl = window.location.href;
        let bypassApiUrl = "https://bypass.vip" + encodeURIComponent(currentUrl);

        fetch(bypassApiUrl)
            .then(response => response.json())
            .then(data => {
                clearInterval(countdown);
                if (data && data.destination) {
                    document.getElementById('my-status').textContent = "SUCCESS! REDIRECTING...";
                    setTimeout(() => {
                        window.location.href = data.destination; // সরাসরি চূড়ান্ত Key পেজে রিডাইরেক্ট
                    }, 1000);
                } else {
                    // ব্যাকআপ ফ্রি এপিআই (যদি প্রথমটি ব্যস্ত থাকে)
                    fetch("https:// those.adsbypasser.workers.dev/?url=" + encodeURIComponent(currentUrl))
                        .then(r => r.json())
                        .then(d => {
                            if(d.bypassed_url) window.location.href = d.bypassed_url;
                            else document.getElementById('my-status').textContent = "API BUSY! PLEASE RE-RUN.";
                        })
                        .catch(() => {
                            document.getElementById('my-status').textContent = "FAILED! TRY AGAIN.";
                        });
                }
            })
            .catch(() => {
                clearInterval(countdown);
                // ফ্যালব্যাক বাটন ক্লিক মেকানিজম (যদি এপিআই সাময়িক ডাউন থাকে)
                document.getElementById('my-status').textContent = "CLICKING MANUAL...";
                let buttons = document.querySelectorAll('button, a');
                for (let b of buttons) {
                    if (b.textContent.includes('Continue to Step') || b.textContent.includes('Continue')) {
                        b.click();
                        break;
                    }
                }
            });
    }
})();
