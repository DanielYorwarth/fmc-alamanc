import { withTheme } from '@emotion/react';
import React from 'react'
import Calendar from "react-calendar";
import { Flex } from 'reflexbox';
import { Wrapper, Hidden, Circle } from './event-calendar.styles';
import { getThisDate } from './helpers';

const EventCalendar = ({theme, events, colors, onClick, categories}) => {

  const setEvents = (date) => {
    const dateobj = events && getThisDate(events, date)
    return dateobj ? `${dateobj.colorName} ${dateobj.active ? 'active' : ''}` : "";
  };

  const setEventIDs = (date, view) => {
    console.log(view)
    const dateobj = events && getThisDate(events, date);
    return <Hidden className="event-id" id={dateobj && dateobj.id}/>;
  };

  return (
    <Wrapper padding={[`${theme.spacing[1]} ${theme.spacing[2]}`, `${theme.spacing[2]} ${theme.spacing[3]}`, `${theme.spacing[2]} ${theme.spacing[5]}`]} colors={colors && colors}>
      <Calendar
        view="month" 
        prev2Label={null} 
        defaultActiveStartDate={null}
        next2Label={null} 
        prevLabel={
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10">
            <path id="Polygon_2" data-name="Polygon 2" d="M5,0l5,9H0Z" transform="translate(0 10) rotate(-90)" fill="#8e8e8e"/>
          </svg>
        }
        nextLabel={
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10">
            <path id="Polygon_1" data-name="Polygon 1" d="M5,0l5,9H0Z" transform="translate(9) rotate(90)" fill="#8e8e8e"/>
          </svg>
        }
        onClickDay={(value, event) => onClick(event.target.nextSibling.id)}
        tileClassName={({ activeStartDate, date }) => setEvents(date)}
        tileContent={({ activeStartDate, date, view }) => setEventIDs(date,view)}
      />
      {categories && <Flex flexWrap="wrap" padding={["0", "0", "1rem 3rem"]}>
        {categories &&  categories.map((category) => <Flex width={["100%", "calc(50% - 1rem)",  "calc(50% - 1rem)", "calc(33.33% - 1rem)"]} marginBottom="1rem" marginRight="1rem" key={category.name}>
          <Circle colour={category.acf.colour}></Circle>{category.name}
        </Flex>)}
      </Flex>}
    </Wrapper>
  )
}

export default withTheme(EventCalendar)