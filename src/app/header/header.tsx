import { Box, Paper, Stack, Typography, styled } from "@mui/material";

const Header = () => {
  const Container = styled(Paper)`
    background-color: #1c3421;
    color: white;
    border-radius: 0 0 15px 0;
    padding: 1rem;
  `;

  return (
    <Container>
      <Typography fontWeight={"bold"}>STOCK PRICE TRACKER</Typography>
    </Container>
  );
};

export default Header;
