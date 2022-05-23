import React from "react";
import { Link } from "react-router-dom";
import { Box } from 'reflexbox'
import { withTheme } from '@emotion/react'
import { Wrapper, ImageWrapper, Image, ContentWrapper, Title, Text, OverlayWrapper } from "./profile.styles";

import arrow from "../../assets/svgs/arrow";
import { IconButton } from "../icon-button";

const Profile = ({width="100%", image, title, text, link, theme, dropdownOptions}) => {

  const jsx = <>
    {image && <ImageWrapper>
      <Image backgroundImage={image} />
      {dropdownOptions && <OverlayWrapper>
        <IconButton
          dropdown={{
            alignRight: true,
            options: dropdownOptions
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="4" height="18" viewBox="0 0 4 18">
            <g id="Group_37" data-name="Group 37" transform="translate(-774 -255)">
              <circle id="Ellipse_19" data-name="Ellipse 19" cx="2" cy="2" r="2" transform="translate(774 255)" fill="#e23734"/>
              <circle id="Ellipse_20" data-name="Ellipse 20" cx="2" cy="2" r="2" transform="translate(774 262)" fill="#e23734"/>
              <circle id="Ellipse_21" data-name="Ellipse 21" cx="2" cy="2" r="2" transform="translate(774 269)" fill="#e23734"/>
            </g>
          </svg>
        </IconButton>
      </OverlayWrapper>}
    </ImageWrapper>}
    {(title || text) && <ContentWrapper alignItems="center" justifyContent="space-between">
      <Box marginRight={theme.spacing[0]}>
        {title && <Title>{title}</Title>}
        {text && <Text>{text}</Text>}
      </Box>
      {link && arrow}
    </ContentWrapper>}
  </>

  return (
    <Wrapper width="100%" maxWidth={width}>
      {link ? <Link to={link}>{jsx}</Link> : jsx}
    </Wrapper>
  )
}

export default withTheme(Profile);