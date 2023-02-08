import styled from '@emotion/styled'
import {css} from '@emotion/react';
import { Flex } from 'reflexbox'
import { lighten } from 'polished';

// Set default styles for component
const wrapperStyling = (props) => css`
  padding: ${props.theme.spacing[1]} ${props.theme.spacing[2]};
  background-color: ${props.primary ? props.theme.colors.primary : props.theme.colors.light};
  outline: ${props.primary ? 'none' : `0.1rem solid ${props.theme.colors.dark}`};
  border-radius: 1rem;
`

const titleStyling = (props) => css`
  color: ${props.primary ? props.theme.colors.light : props.theme.colors.dark};
  font-weight: ${props.theme.fontWeights.black};
  line-height: ${props.theme.lineHeights.base};
  margin-bottom: ${props.theme.spacing[0]};
  font-size: ${props.theme.fontSizes[3]};
`

const textStyling = (props) => css`
  color: ${props.primary ?  lighten('0.44', `${props.theme.colors.primary}`) : props.theme.colors.darkGrey};
  font-weight: ${props.theme.fontWeights.body};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[1]};
  word-break: break-all;
  @media screen and (max-width: 600px) {
    font-size: ${props.theme.fontSizes[0]};
  }
`


const smallTextStyling = (props) => css`
  color: ${props.primary ?  lighten('0.44', `${props.theme.colors.primary}`) : props.theme.colors.darkGrey};
  font-weight: ${props.theme.fontWeights.bold};
  line-height: ${props.theme.lineHeights.base};
  font-size: ${props.theme.fontSizes[0]};
`

const imageStyling = (props) => css`
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 100rem;
  margin-bottom: 1rem;
`


export const Wrapper = styled(Flex)(wrapperStyling);
export const Title = styled.h4(titleStyling);
export const Text = styled.span(textStyling);
export const SmallText = styled.span(smallTextStyling);
export const Image = styled.img(imageStyling);
