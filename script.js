(function() {
    'use strict';

    // ১. প্যানেলের সুন্দর ডিজাইন (CSS) যুক্ত করা
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

    // ৩. VERIFY & RUN বোতামের কাজ সেট করা
    document.getElementById('verify-btn').addEventListener('click', function() {
        const inputKey = document.getElementById('license-input').value.trim();

        // ⚠️ আপনার পাসওয়ার্ডটি এখানে সেট করুন (যেমন আপনার বন্ধুর ছিল 'Alone')
        if (inputKey.toLowerCase() === 'alone' || inputKey.toLowerCase() === 'open') {
            startCountdown();
        } else {
            alert('Invalid License Key! Try again.');
        }
    });

    // ৪. কাউন্টডাউন টাইমার এবং অটো-ক্লিক ফাংশন
    function startCountdown() {
        const content = document.getElementById('auth-content');
        content.innerHTML = `
            <div id="my-timer">25</div>
            <div id="my-status">REDIRECTING...</div>
        `;

        let timeLeft = 25; // আপনার বন্ধুর মতো ২৫ সেকেন্ডের টাইমার
        const countdown = setInterval(function() {
            timeLeft--;
            document.getElementById('my-timer').textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdown);
                document.getElementById('my-status').textContent = "CLICKING...";
                
                // টাইমার শেষ হলে স্বয়ংক্রিয়ভাবে পেজের বাটন খুঁজে ক্লিক করবে
                let buttons = document.querySelectorAll('button, a');
                for (let button of buttons) {
                    if (button.textContent.includes('Continue to Step') || button.textContent.includes('Continue')) {
                        button.click();
                        break;
                    }
                }
                
                // ৫ সেকেন্ড পর প্যানেলটি স্ক্রিন থেকে গায়েব হয়ে যাবে
                setTimeout(() => { panel.remove(); }, 5000);
            }
        }, 1000);
    }
})();
