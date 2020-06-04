import styled, { css } from 'styled-components';

const Select = styled.select`
width: 100%;
${css`
height:90%;
background-color: lightgrey;
padding: 1%;
border-radius: 0.4em;
`}
`;

const style = {
  color: 'red',
};

export { Select, style };
