import React from "react";
import { Box } from "reflexbox";
import { Circle, Line, Title, Wrapper, Text, DateWrapper } from "./event-timeline-horizontal.styles";
import { withTheme } from "@emotion/react";

const EventTimelineHorizontal = ({ theme, events, title }) => {
  return (
    <Box>
      {title && (
        <Box marginBottom={theme.spacing[1]}>
          <Title>{title}</Title>
        </Box>
      )}
      <Wrapper>
        {events && events.map((event) => (
          <DateWrapper
            flexDirection="column"
            key={event.id}
            minWidth="20rem"
            width="24rem"
            marginBottom={theme.spacing[1]}
            marginRight={theme.spacing[1]}
          >
            <Box maxWidth="24rem" marginBottom={theme.spacing[0]}>
              <Circle colour={event.color} />
            </Box>
            <Box>
              {(event.start || event.time) && (
                <Text>
                  {event.start && event.start}
                  {event.time && <>, {event.time}</>}
                </Text>
              )}
              {event.name && <Title>{event.name}</Title>}
            </Box>
          </DateWrapper>
        ))}
        <Line />
      </Wrapper>
    </Box>
  );
};

export default withTheme(EventTimelineHorizontal);
