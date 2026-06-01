(function() {
    'use strict';

    // ১. প্যানেলের প্রিমিয়াম গ্লোয়িং ডিজাইন (Modern Gaming CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://googleapis.com');
        
        #my-auth-panel {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #0b0f19 0%, #111827 100%);
            border: 2px solid #00f0ff; border-radius: 16px;
            padding: 30px; width: 340px; text-align: center; 
            font-family: 'Poppins', sans-serif;
            box-shadow: 0px 0px 30px rgba(0, 240, 255, 0.25), inset 0 0 15px rgba(0, 240, 255, 0.1);
            z-index: 100000; color: #fff;
            backdrop-filter: blur(10px);
            animation: panelAppear 0.4s ease-out;
        }
        @keyframes panelAppear {
            from { transform: translate(-50%, -45%); opacity: 0; }
            to { transform: translate(-50%, -50%); opacity: 1; }
        }
        #my-auth-panel h2 { 
            font-family: 'Orbitron', sans-serif; color: #00f0ff; 
            font-size: 22px; font-weight: 700; margin: 0 0 5px 0; 
            text-shadow: 0 0 10px rgba(0, 240, 255, 0.5); letter-spacing: 1px;
        }
        #my-auth-panel p { color: #9ca3af; font-size: 11px; margin: 0 0 20px 0; font-weight: 500; letter-spacing: 0.5px; }
        
        .input-container { position: relative; margin-bottom: 20px; }
        #my-auth-panel input {
            width: 88%; padding: 12px 15px; background: #1f2937; 
            border: 1px solid #374151; border-radius: 8px; 
            color: #fff; text-align: center; font-size: 14px; 
            outline: none; transition: 0.3s;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
        }
        #my-auth-panel input:focus { 
            border-color: #00f0ff; 
            box-shadow: 0 0 10px rgba(0, 240, 255, 0.3), inset 0 2px 4px rgba(0,0,0,0.3); 
        }
        
        #my-auth-panel button {
            width: 98%; padding: 14px; 
            background: linear-gradient(90deg, #00f0ff, #00ffaa); 
            border: none; border-radius: 8px;
            color: #0b0f19; font-weight: 700; font-size: 14px; 
            cursor: pointer; transition: 0.3s;
            font-family: 'Orbitron', sans-serif; letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(0, 240, 255, 0.2);
        }
        #my-auth-panel button:hover { 
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 255, 170, 0.4); 
        }
        #my-auth-panel button:active { transform: translateY(0); }
        
        #my-timer { 
            font-family: 'Orbitron', sans-serif; font-size: 56px; 
            font-weight: 700; color: #00ffaa; margin: 15px 0; 
            text-shadow: 0 0 15px rgba(0, 255, 170, 0.4);
            animation: pulse 1s infinite alternate;
        }
        @keyframes pulse {
            from { transform: scale(1); } to { transform: scale(1.05); }
        }
        #my-status { 
            color: #00ffaa; font-weight: 600; font-size: 12px; 
            letter-spacing: 1.5px; text-transform: uppercase;
        }
    `;
    document.head.appendChild(style);

    // ২. স্ক্রিনে নতুন প্রিমিয়াম প্যানেল বক্স তৈরি
    const panel = document.createElement('div');
    panel.id = 'my-auth-panel';
    panel.innerHTML = `
        <h2>MY SYSTEM AUTH</h2>
        <p>SECURE KEY SYSTEM BYPASSER</p>
        <div id="auth-content">
            <div class="input-container">
                <input type="text" id="license-input" placeholder="ENTER LICENSE KEY">
            </div>
            <button id="verify-btn">VERIFY & RUN</button>
        </div>
    `;
    document.body.appendChild(panel);

    // ৩. VERIFY & RUN বোতাম অ্যাকশন
    document.getElementById('verify-btn').addEventListener('click', function() {
        const inputKey = document.getElementById('license-input').value.trim();

        if (inputKey.toLowerCase() === 'alone' || inputKey.toLowerCase() === 'open') {
            startBypassProcess();
        } else {
            alert('Invalid License Key! Access Denied.');
        }
    });

    // ৪. এপিআই দিয়ে ৫টি ধাপ একবারে বাইপাস করার আধুনিক ফাংশন
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

        // বর্তমান URL নিয়ে সঠিক ফ্রি এপিআই এ্যান্ডপয়েন্টে পাঠানো
        let currentUrl = window.location.href;
        let bypassApiUrl = "https://bypass.vip" + encodeURIComponent(currentUrl);

        fetch(bypassApiUrl)
            .then(response => response.json())
            .then(data => {
                clearInterval(countdown);
                if (data && data.destination) {
                    document.getElementById('my-status').textContent = "SUCCESS! REDIRECTING...";
                    setTimeout(() => {
                        window.location.href = data.destination; 
                    }, 1000);
                } else {
                    // ব্যাকআপ ক্লাউড এপিআই ওয়ার্কার্স
                    fetch("https://workers.dev" + encodeURIComponent(currentUrl))
                        .then(r => r.json())
                        .then(d => {
                            if(d.bypassed_url) window.location.href = d.bypassed_url;
                            else document.getElementById('my-status').textContent = "API BUSY! RE-RUN SYSTEM.";
                        })
                        .catch(() => {
                            document.getElementById('my-status').textContent = "SERVER ERROR! TRY AGAIN.";
                        });
                }
            })
            .catch(() => {
                clearInterval(countdown);
                document.getElementById('my-status').textContent = "RUNNING MANUAL CLICK...";
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
