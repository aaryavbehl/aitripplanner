function getItinerary(e) {

    e.preventDefault()
  
    console.log(e.target.location.value)
  
    fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1FO234TVAM8APAXQ79VRCPK7K5RELNQSZ6SMKQRT4PL443IHT4SEIVOFT22GK72Z'
      },
  
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [{
          'role': 'user',
          'content': `plan a trip itinerary for someone going to ${e.target.location.value} from ${e.target.startdate.value} to ${e.target.enddate.value}. have about 3 or 4 things to do per day. respond ONLY with an array that has JSON objects with the parameters \`date\` \`eventTitle\` \`startTime\` \`endTime\`\`\`\``
        }]
      })
    }).then(result => result.json()).then(eventsResponse => {
      console.log(eventsResponse)
      const events = JSON.parse(eventsResponse.choices[0].message.content)
  
  
  
      let htmlGenerated = ""
  
      for (const event of events) {
        //add it on
        htmlGenerated += `<div style="color: black; background-color: white; padding: 10px; margin-bottom: 10px;">
  
        <h3>${event.eventTitle}</h3>
        <p>${new Date(event.date).toLocaleDateString(undefined, { dateStyle: "medium" })}</p>
  
        <p>${event.startTime} - ${event.endTime}</p>
  
        </div>`
      }
  
      document.getElementById("eventlist").innerHTML = htmlGenerated
    });
  }