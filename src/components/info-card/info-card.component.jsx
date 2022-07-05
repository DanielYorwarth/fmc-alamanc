import React from "react";
import { Flex, Box } from "reflexbox";
import { Wrapper, Title, Text, SmallText } from "./info-card.styles";

const InfoCard = ({width, title, textList, phone1, phone2, email, primary}) => <Wrapper marginRight={['0', "2rem"]} marginBottom="2rem" flexDirection="column" primary={primary} justifyContent="center" width={width}>
   {title && <Title primary={primary}>{title}</Title>}
  {textList && <Flex marginBottom="1rem" flexWrap="wrap">
    {textList.map((text, i) => <SmallText primary={primary} key={i} dangerouslySetInnerHTML={{__html: i !== textList.length - 1 ? `${text}&nbsp&nbsp•&nbsp&nbsp` : text}}/>)}
  </Flex>}
  <Flex flexWrap="wrap">
    {phone1 && <Text primary={primary}>{phone1}</Text>}
    {(phone1 && phone2) && <Text primary={primary}><Box margin="0 0.5rem">|</Box></Text>}
    {phone2 && <Text primary={primary}>{phone2}</Text>}
  </Flex>
  {email && <a href={`mailto:${email}`}><Text primary={primary}>{email}</Text></a>}
</Wrapper>

export default InfoCard;