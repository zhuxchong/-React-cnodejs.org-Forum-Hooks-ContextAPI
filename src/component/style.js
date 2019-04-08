import styled from "styled-components";

export const Title = styled.span`
  height: 40px;
  display: "flex";
  margin-top: 30px;
  position: absolute;
  top: ${props => (props.count ? `${props.count * 40}px` : 0)};
  width: 100%;
`;
