(function() {
    'use strict';

    // সব ধরনের সম্ভাব্য বাটন ও লিংকের নাম (৫টি ধাপের জন্য)
    let targets = ['Continue to Step', 'Continue', 'Get Key', 'Verify', 'Next Step', 'Get Link', 'Próximo', 'Passo', 'Skip', 'Skip Ad'];
    
    // ফাংশন: পেজের বাটন খুঁজে ক্লিক করা
    function autoClickButton() {
        let elements = document.querySelectorAll('button, a, div, span, input[type="button"]');
        let clicked = false;

        for (let el of elements) {
            let txt = el.textContent.trim();
            if (targets.some(target => txt.includes(target)) && el.offsetWidth > 0 && el.offsetHeight > 0) {
                console.log("Auto Clicking: " + txt);
                el.click();
                clicked = true;
                break;
            }
        }

        if (!clicked) {
            let fallbackBtn = document.querySelector('.btn, .button, input[type="submit"]');
            if (fallbackBtn) {
                fallbackBtn.click();
                clicked = true;
            }
        }
        return clicked;
    }

    // যদি এটি প্রথম পেজ বা রিডাইরেক্ট পেজ হয় (প্যানেল দেখাবে)
    if (window.location.href.includes('getkey') && !window.location.search.includes('token')) {
        // প্রথম পেজে সরাসরি ক্লিক করার চেষ্টা
        if (!autoClickButton()) {
            showAuthPanel();
        }
    } else if (window.location.href.includes('getkey') && window.location.search.includes('token')) {
        // যদি এটি চূড়ান্ত Key পেজ হয়, তবে কিছুই করবে না (আপনার কী দেখাবে)
        console.log("Final Key Page Reached!");
    } else {
        // মাঝখানের বাকি ধাপ বা বিজ্ঞাপনের পেজগুলোতে প্যানেল না দেখিয়ে সরাসরি ৩ সেকেন্ডের মধ্যে অটো-ক্লিক করবে
        console.log("Ad Page Detected. Attempting Auto-Skip...");
        setTimeout(function() {
            autoClickButton();
        }, 3000);
    }

    // প্যানেল তৈরি ও ডিজাইনের ফাংশন (শুধুমাত্র প্রথমবার ভেরিফিকেশনের জন্য)
    function showAuthPanel() {
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

        document.getElementById('verify-btn').addEventListener('click', function() {
            const inputKey = document.getElementById('license-input').value.trim();
            if (inputKey.toLowerCase() === 'alone' || inputKey.toLowerCase() === 'open') {
                startCountdown(panel);
            } else {
                alert('Invalid License Key! Try again.');
            }
        });
    }

    function startCountdown(panel) {
        const content = document.getElementById('auth-content');
        content.innerHTML = `
            <div id="my-timer">25</div>
            <div id="my-status">REDIRECTING...</div>
        `;

        let timeLeft = 25; 
        const countdown = setInterval(function() {
            timeLeft--;
            document.getElementById('my-timer').textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                document.getElementById('my-status').textContent = "CLICKING...";
                autoClickButton();
                setTimeout(() => { panel.remove(); }, 2000);
            }
        }, 1000);
    }
})();
