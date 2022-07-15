import styled from "styled-components";

interface IContextType {
  name: string;
}

const ContextBox = ({ name }: IContextType) => {
  return <Box>{name}</Box>;
};

export default ContextBox;

const Box = styled.div`
  width: 300px;
  height: 20px;
  text-align: center;
  margin: 20px;
  background-color: #fff;
`;
