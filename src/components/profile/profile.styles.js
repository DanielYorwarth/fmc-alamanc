import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Flex, Box } from 'reflexbox'

// Set default styles for component
const wrapperStyling = (props) => css`
  background-color: ${props.theme.colors.light};
  color: ${props.theme.colors.dark};
`

const contentWrapper = (props) => css`
  background-color: ${props.theme.colors.light};
  padding: ${props.theme.spacing[2]};
`

const titleStyling = (props) => css`
  color: ${props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.black};
  font-size: ${props.theme.fontSizes[4]};
  line-height: ${props.theme.lineHeights.base};
  margin-bottom: 0.5rem;
`

const textStyling = (props) => css`
  color: ${props.theme.colors.darkGrey};
  font-weight: ${props.theme.fontWeights.light};
  font-size: ${props.theme.fontSizes[2]};
`

const imageWrapperStyling = (props) => css`
  position: relative;
  width: 100%;
  height: 32rem;
`

const imageStyling = (props) => css`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(${props.backgroundImage});
`

const overlayWrapperStyling = (props) => css`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
`

export const Wrapper = styled(Box)(wrapperStyling);
export const OverlayWrapper = styled(Box)(overlayWrapperStyling);
export const Image = styled(Box)(imageStyling);
export const ImageWrapper = styled(Box)(imageWrapperStyling);
export const ContentWrapper = styled(Flex)(contentWrapper);
export const Title = styled.h4(titleStyling);
export const Text = styled.span(textStyling);
