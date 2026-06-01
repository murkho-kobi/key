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
            startCountdown();
        } else {
            alert('Invalid License Key! Try again.');
        }
    });

    // ৪. কাউন্টডাউন টাইমার এবং অল-ইন-ওয়ান অটো-ক্লিক ফাংশন
    function startCountdown() {
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
                
                // শক্তিশালী বাটন সার্চ মেকানিজম (সব ধরণের বাটন ও এংকর ট্যাগ চেক করবে)
                let elements = document.querySelectorAll('button, a, div, span, input[type="button"]');
                let targets = ['Continue to Step', 'Continue', 'Get Key', 'Verify', 'Next Step', 'Get Link', 'Próximo', 'Passo'];
                let clicked = false;

                for (let el of elements) {
                    let txt = el.textContent.trim();
                    if (targets.some(target => txt.includes(target)) && el.offsetWidth > 0 && el.offsetHeight > 0) {
                        el.click();
                        clicked = true;
                        break;
                    }
                }

                // যদি নির্দিষ্ট টেক্সট না পায়, তবে পেজের যেকোনো অ্যাক্টিভ লিংক বা সাবমিট বাটন ট্রাই করবে
                if (!clicked) {
                    let fallbackBtn = document.querySelector('.btn, .button, input[type="submit"]');
                    if (fallbackBtn) fallbackBtn.click();
                }
                
                setTimeout(() => { panel.remove(); }, 3000);
            }
        }, 1000);
    }
})();
