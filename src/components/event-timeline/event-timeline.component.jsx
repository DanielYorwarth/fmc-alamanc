import React from "react"
import { Box, Flex } from "reflexbox"
import { Circle, Line, Title, Wrapper, Text } from "./event-timeline.styles"
import { withTheme } from "@emotion/react"

const EventTimeline = ({theme, events, title}) => {
  return (
    <Box padding={`0 ${theme.spacing[3]}`}>
      {title && <Box marginBottom={theme.spacing[1]}>
        <Title>{title}</Title>
      </Box>}
      <Wrapper paddingTop={theme.spacing[1]}>
        <Line />
        {events && events.map(({date, time, title, colour=theme.colour.primary}) => <Flex key={title} width="100%" marginBottom={theme.spacing[1]}>
          <Box marginRight={theme.spacing[0]}>
            <Circle colour={colour} />
          </Box>
          <Box>
            {(date || time) && <Text>{date && date}{time && <>, {time}</>}</Text>}
            {title && <Title>{title}</Title>}
          </Box>
        </Flex>)}
      </Wrapper>
    </Box>
  )
}

export default withTheme(EventTimeline)