export const getAllEvents = async () => {
    try {
      const res = await fetch(`http://localhost:5000/events`)
      const data = await res.json()
      return data.results
    } catch (err) {
      console.log(err)
  }}

export const updateEvent = async (eventId) => { 

  const options = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }

    try {
      const res = await fetch(`http://localhost:5000/events/${eventId}`, options)
      const data = await res.json()
      return data.results
    } catch (err) {
      console.log(err)
  }}
