import React, { useState } from 'react';
import { AccordianTitle, Panel } from './accordian.styles';
import { Box, Flex } from 'reflexbox';
import { withTheme } from '@emotion/react'

import minus from '../../assets/svgs/minus';
import plus from '../../assets/svgs/plus';
import { InfoPopup } from '../info-popup';

const Accordian = ({theme, title, children, width="100%", active = false, infoBox}) => {

  // setup active state to track if accordian is active so we can conditonally set css styles
  const [isActive, setIsActive] = useState(active);

  // Toggle active state when this function is run
  const handleOnClick = () => {
    setIsActive(!isActive)
  }

  return (
    <Box marginBottom={theme.spacing[1]} width={width}>
      {title && <AccordianTitle alignItems="center" justifyContent="space-between" onClick={handleOnClick}>
        <Flex alignItems="center">
          {title}
          {infoBox &&<Box marginLeft="1rem">
            <InfoPopup width="37rem">
              {infoBox}
            </InfoPopup>
          </Box>}
        </Flex>
        {
          isActive ? minus : plus
        }
      </AccordianTitle>}
      <Panel active={isActive}>
        {children && children}
      </Panel>
    </Box>
  )
}
export default withTheme(Accordian);