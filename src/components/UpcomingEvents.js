import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Event from "./event"
import { screenSizeM } from "../utils/styles"

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 8px;

  @media (max-width: ${screenSizeM}) {
    flex-direction: column;
  }
`

const UpcomingEvents = () => {
  const [eventsState, setEventsState] = useState({
    events: [],
    loading: true,
  })

  useEffect(() => {
    fetch("/.netlify/functions/events")
      .then(response => response.json())
      .then(result => {
        const sortedEvents = result.data.records.sort((a, b) => {
          try {
            const aDay = a.fields["Dates"].slice(0, 6)
            const aYear = a.fields["Dates"].slice(-4)
            const aDate = new Date(`${aDay} ${aYear}`)

            const bDay = b.fields["Dates"].slice(0, 6)
            const bYear = b.fields["Dates"].slice(-4)
            const bDate = new Date(`${bDay} ${bYear}`)

            return aDate - bDate
          } catch (e) {
            console.error(e)
            return 0
          }
        })
        setEventsState({ events: sortedEvents, loading: false })
      })
      .catch(e => {
        console.error(e)
      })
  }, [])

  return (
    <EventsContainer>
      {eventsState.loading && <p>Loading upcoming events...</p>}
      {eventsState.events.length > 0 &&
        eventsState.events
          .filter(event => {
            return event.fields["Name"] && event.fields["Event website"]
          })
          .map((event, i) => {
            return (
              <Event
                key={i}
                title={event.fields["Name"]}
                dates={event.fields["Dates"]}
                url={event.fields["Event website"]}
              />
            )
          })}
    </EventsContainer>
  )
}

export default UpcomingEvents
