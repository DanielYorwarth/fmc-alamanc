import React, {useEffect, useState} from "react";
import { Box, Flex } from "reflexbox";
import { H1Title, LargeH1Title, PText } from "../components/styles";
import getData from "../helpers/get-data";
import { eventsEndpoint, categoriesEndpoint } from "../api-endpoints/wordpress";
import formatDate from "../helpers/format-date";
import { EventTimelineHorizontal } from "../components/events-timeline-horizontal";
import { Link } from "react-router-dom";
import { Loading } from "../components/loading";
import { useEffectOnce } from "../hooks/use-effect-once";

const Dashboard = () => {
  
  const [events, setEvents] = useState(null)
  const [pageData, setPageData] = useState(null)
  const [eventsFormatted, setEventsFormatted] = useState(null)
  const [eventsCategories, setEventsCategories] = useState(null)

  // Fetch page data
  useEffectOnce(() => {
    getData(null, 366, setPageData).catch(console.error)
    getData(eventsEndpoint, null, setEvents).catch(console.error)
    getData(categoriesEndpoint, null, setEventsCategories).catch(console.error)
  }, [])

  // add class for colour to event object and remove irrelivant data from individual events objects
  useEffect(() => {
    if(!events || !eventsCategories) return
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
        color: eventsCategories[indexColor].acf.colour,
        active: false,
      }
    }).sort((a, b) => {
      return new Date(a.start) - new Date(b.start);
    }).filter(event => {
      const parts = event.start.split(/[- :]/);
      var month = parts[1];
      var year = parts[0];
      var currentdate = new Date();
      var cur_month = currentdate.getMonth() + 1;
      var cur_year = currentdate.getFullYear();
      return  cur_month == month && year == cur_year
    })
    setEventsFormatted(formattedEvents)
  }, [events, eventsCategories])

  return (
    <>
      {!pageData && !eventsFormatted ?  
        <Loading />
      :
       <>
         <Flex flexWrap="wrap" marginBottom="5rem">
        {(pageData && pageData.acf && pageData.acf.title) && <Box width={['100%', '100%', '100%','calc(25% - 5rem)']} marginRight={['0', '0', '0', '5rem']}>
          <LargeH1Title>{pageData.acf.title}</LargeH1Title>
        </Box>}
        {(pageData && pageData.acf && pageData.acf.text_1) &&<Box width={['100%', '100%', '100%','calc(37.5% - 5rem)']} marginRight={['0', '0', '0', '5rem']}>
          <PText dangerouslySetInnerHTML={{__html: pageData.acf.text_1}}/>
        </Box>}
        {(pageData && pageData.acf && pageData.acf.text_2) &&<Box width={['100%', '100%', '100%','calc(37.5% - 5rem)']}>
          <PText dangerouslySetInnerHTML={{__html: pageData.acf.text_2}}/>
        </Box>}
      </Flex>
      {eventsFormatted && 
      <Box>
        <Flex flexWrap="wrap" justifyContent="space-between">
          <H1Title>THIS MONTHS EVENTS</H1Title>
          <Link to="/calendar">
            <Flex marginBottom={["2rem"]} alignItems="center">
              <Box marginRight="1rem">View all events</Box>
              <svg id="Group_118" data-name="Group 118" xmlns="http://www.w3.org/2000/svg" width="35" height="36" viewBox="0 0 35 36">
                <rect id="Rectangle_18" data-name="Rectangle 18" width="35" height="36" fill="none"/>
                <line id="Line_6" data-name="Line 6" x2="24" transform="translate(6 18)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                <path id="Path_10" data-name="Path 10" d="M40,56,50.074,66.074,40,76.148" transform="translate(-19.852 -48.165)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              </svg>
            </Flex>
          </Link>
        </Flex>
          <EventTimelineHorizontal
            events={eventsFormatted.map(event => {
              return {
                title: event.name,
                date: formatDate(event.start),
                time: event.time,
                colour: event.color,
              }
            })}
          />
      </Box>}
       </>
      }
    </>
  );
}

export default Dashboard;