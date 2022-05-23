import React, { useState, useEffect } from "react";
import { EventInfo } from "../components/event-info";
import { SidepanelRight } from "../components/sidepanel-right";
import { H1Title } from "../components/styles";
import { EventTimeline } from "../components/event-timeline";
import { EventCalendar } from "../components/event-calendar";
import { Box, Flex } from "reflexbox";
import { categoriesEndpoint, eventsEndpoint } from "../api-endpoints/wordpress";
import getData from "../helpers/get-data";
import { InfoPopup } from "../components/info-popup";
import formatDate from "../helpers/format-date";
import { Loading } from "../components/loading";

const Calendar = () => {

  // set states for 
  const [events, setEvents] = useState(null)
  const [eventsFormatted, setEventsFormatted] = useState(null)
  const [eventsCategories, setEventsCategories] = useState(null)
  const [eventColors, setEventColors] = useState(null)
  const [indvidualEvent, setIndvidualEvent] = useState(null)
  const [indvidualEventActive, setIndvidualEventActive] = useState(false)

  // Fetch page data
  useEffect(() => {
    getData(eventsEndpoint, null, setEvents).catch(console.error)
    getData(categoriesEndpoint, null, setEventsCategories).catch(console.error)
  }, [])

  // add class for colour to event object and remove irrelivant data from individual events objects
  useEffect(() => {
    if(!events || !eventsCategories || !eventColors) return
    const formattedEvents = events.map((x) => {
      let indexColor = eventsCategories.findIndex((category) => category.name === x.acf.category[0].name);
      return {
        id: x.id, 
        name: x.acf.title,
        start: x.acf.date_from, 
        end: x.acf.date_to, 
        time: x.acf.time, 
        image: x.acf.image ? x.acf.image.url : null,
        description: x.acf.description ? x.acf.description : null,
        eventCategory: x.acf.category[0].name, 
        colorName: eventColors[indexColor],
        color: eventsCategories[indexColor].acf.colour,
        active: false,
      }
    }).sort((a, b) => {
      return new Date(a.start) - new Date(b.start);
    });
    setEventsFormatted(formattedEvents)
  }, [events, eventsCategories, eventColors])

  // Set class list for colours
  useEffect(() => {
    if(!eventsCategories) return
    setEventColors(eventsCategories.map((e, i) => `highlighted${i}`))
  }, [eventsCategories])

  const onDateClickHandler = (id) => {
    if(!id || id === "") return
    setIndvidualEvent(eventsFormatted.find(event => event.id == id))
    setEventsFormatted(eventsFormatted.map(event => {
      return {...event, active: event.id == id ? true : false}
    }))
    setIndvidualEventActive(true)
  }

  const onBackClickHandler = (id) => {
    setIndvidualEvent(null)
    setEventsFormatted(eventsFormatted.map(event => {
      return {...event, active: false}
    }))
    setIndvidualEventActive(false)
  }

  return (
    <>
      {!eventsFormatted ?
        <Loading />
      : 
      <>
      <Box marginBottom="4rem" width={["100%", "100%", "100%", "calc(75% - 14rem)"]}>
        {eventsFormatted && <H1Title>
          <Flex alignItems="center">
            CALENDAR 
            <Box marginLeft="1.5rem">
              <InfoPopup width="42rem">
              Due to the COVID-19 pandemic, all scheduled committee meetings prior to 21 June 2021 are taking place virtually. Please note that during this period of uncertainty, all events are subject to cancellation or postponement. The venue for The Furniture Makers’ Company events is Furniture Makers’ Hall unless shown otherwise. Guests are very welcome to most events.
              </InfoPopup>
            </Box>
          </Flex>
        </H1Title>}
        {eventsFormatted && <EventCalendar categories={eventsCategories} onClick={(id) => onDateClickHandler(id)} events={eventsFormatted} colors={eventsCategories && eventsCategories.map((category) => category.acf.colour)} />}
      </Box>
      <SidepanelRight onOutsideClick={() => setIndvidualEventActive(null)} right={indvidualEventActive ? '0' : '-100%'} width={["80%", "70%", "60%", "25%"]}>
        {indvidualEvent ? 
        <>
          <EventInfo 
            onClick={onBackClickHandler}
            image={indvidualEvent.image}
            title={indvidualEvent.name}
            date={formatDate(indvidualEvent.start)}
            dateEnd={indvidualEvent.end && formatDate(indvidualEvent.end)}
            time={indvidualEvent.time}
            colour={indvidualEvent.color}
            description={indvidualEvent.description}
          />
        </>
        :  
        eventsFormatted && 
          <EventTimeline
            title="All Events"
            events={eventsFormatted.map(event => {
              return {
                title: event.name,
                date: formatDate(event.start),
                time: event.time,
                colour: event.color,
              }
            })}
          />
        }
      </SidepanelRight>
      </>
      }
    </>
  )
}

export default Calendar;