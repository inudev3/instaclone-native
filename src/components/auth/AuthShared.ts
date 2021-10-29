import styled from "styled-components/native";

type InputProp = {
  lastOne?: boolean;
};
export const StyledInput = styled.TextInput<InputProp>`
  width: 100%;
  color: white;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 18px 7px;
  border-radius: 4px;
  margin-bottom: ${(props) => (props.lastOne ? "10px" : "8px")};
`;
