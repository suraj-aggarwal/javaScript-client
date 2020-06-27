import styled, { css } from 'styled-components';

const Input = styled.input`
border: thin solid ;
width: 100%;
padding: 1%;
border-radius: 4px;
${(props) => props.value === 'Disabled Input'
        && css`
border-color: lightgray;
`};
${(props) => props.value === 'Accessiable'
        && css`
border-color: orange;
font-weight: bold;
`};
${(props) => props.value === '101'
        && css`
font-weight: bold;
`};
`;

const style = {
  color: 'red',
};

export { Input, style };
