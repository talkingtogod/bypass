// Function to send IP information to Discord webhook only on failed login attempt
function sendFailedLoginToDiscord(ipInfo) {
  const webhookUrl = `https://discord.com/api/webhooks/1337082379914969159/TLXw8od8lNPl8x1c5hHq7e9NZb28AipNILiEWA19hvtf2v7vUeVQHiJZqi93vCPa77Q1`; // Your Discord webhook URL

  const xhr = new XMLHttpRequest();
  xhr.open('POST', webhookUrl);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log('Failed login IP information sent to Discord successfully.');
      } else {
        console.error('Error sending IP information to Discord.');
      }
    }
  };

  const timestamp = new Date().toISOString();
  const ipInfoLink = `https://ipinfo.io/${ipInfo.ip}`;

  const payload = JSON.stringify({
    embeds: [{
      title: 'Failed Login Attempt',
      description: `**IP:** ${ipInfo.ip}\n**Country:** :flag_${ipInfo.country.toLowerCase()}: ${ipInfo.country}`,
      fields: [
        { name: 'City', value: ipInfo.city, inline: true },
        { name: 'Region', value: ipInfo.region, inline: true },
        { name: 'Coordinates', value: ipInfo.loc, inline: true },
        { name: 'Timezone', value: ipInfo.timezone, inline: true },
        { name: 'More Info', value: `[Click Me](${ipInfoLink})`, inline: true }
      ],
      timestamp: timestamp,
      footer: {
        text: 'Made By RealKinG!'
      }
    }]
  });

  xhr.send(payload);
}

// Function to get IP information only when login fails
function getIPInfoForFailedLogin() {
  const ipInfoUrl = 'https://ipinfo.io/json?token=943f275481286b'; // Your ipinfo.io token

  fetch(ipInfoUrl)
    .then(response => response.json())
    .then(data => {
      sendFailedLoginToDiscord(data); // Send IP info to webhook for failed login
    })
    .catch(error => console.error('Error retrieving IP information:', error));
}
