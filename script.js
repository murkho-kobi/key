(function() {
    'use strict';

    // ১. একদম সাধারণ কালো-সাদা ডিজাইন
    const style = document.createElement('style');
    style.innerHTML = `
        #my-auth-panel {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: #ffffff; border: 1px solid #000000; border-radius: 5px;
            padding: 20px; width: 300px; text-align: center; z-index: 100000; color: #000000;
        }
        #my-auth-panel h2 { font-size: 18px; margin: 0 0 10px 0; color: #000000; }
        #my-auth-panel input { width: 85%; padding: 8px; margin-bottom: 10px; border: 1px solid #000000; text-align: center; }
        #my-auth-panel button { width: 92%; padding: 10px; background: #000000; color: #ffffff; border: none; cursor: pointer; font-weight: bold; }
        #my-timer { font-size: 40px; font-weight: bold; margin: 10px 0; color: #000000; }
        #my-status { font-size: 12px; font-weight: bold; color: #000000; }
    `;
    document.head.appendChild(style);

    // ২. সাধারণ প্যানেল বক্স তৈরি
    const panel = document.createElement('div');
    panel.id = 'my-auth-panel';
    panel.innerHTML = `
        <h2>MY SYSTEM AUTH</h2>
        <div id="auth-content">
            <input type="text" id="license-input" placeholder="ENTER KEY HERE">
            <button id="verify-btn">VERIFY & RUN</button>
        </div>
    `;
    document.body.appendChild(panel);

    // ৩. বাটন অ্যাকশন
    document.getElementById('verify-btn').addEventListener('click', function() {
        const inputKey = document.getElementById('license-input').value.trim();
        if (inputKey.toLowerCase() === 'alone' || inputKey.toLowerCase() === 'open') {
            startBypassProcess();
        } else {
            alert('Invalid Key!');
        }
    });

    // ৪. সরাসরি শেষ পেজে রিডাইরেক্ট করার বাইপাস ফাংশন
    function startBypassProcess() {
        const content = document.getElementById('auth-content');
        content.innerHTML = `
            <div id="my-timer">15</div>
            <div id="my-status">BYPASSING TO FINAL PAGE...</div>
        `;

        let timeLeft = 15; 
        const countdown = setInterval(function() {
            timeLeft--;
            document.getElementById('my-timer').textContent = timeLeft;
            if (timeLeft <= 0) clearInterval(countdown);
        }, 1000);

        let currentUrl = window.location.href;
        
        // ফ্রি শক্তিশালী ইউনিভার্সাল বাইপাস এপিআই
        let bypassApiUrl = "https://bypass.vip" + encodeURIComponent(currentUrl);

        fetch(bypassApiUrl)
            .then(response => response.json())
            .then(data => {
                clearInterval(countdown);
                if (data && data.destination) {
                    // মাঝখানের পেজগুলো স্কিপ করে সরাসরি শেষ পেজে রিডাইরেক্ট
                    window.location.href = data.destination; 
                } else {
                    // ব্যাকআপ এপিআই যদি প্রথমটি ব্যস্ত থাকে
                    fetch("https://bypass.vip" + encodeURIComponent(currentUrl))
                        .then(r => r.json())
                        .then(d => {
                            if(d.destination) window.location.href = d.destination;
                            else document.getElementById('my-status').textContent = "TRY AGAIN IN BASE CHROMIUM";
                        }).catch(() => {
                            document.getElementById('my-status').textContent = "FAILED TO BYPASS LINK";
                        });
                }
            })
            .catch(() => {
                clearInterval(countdown);
                document.getElementById('my-status').textContent = "CONNECTION ERROR";
            });
    }
})();
