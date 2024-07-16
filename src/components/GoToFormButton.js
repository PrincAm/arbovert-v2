import { Button, Container, styled } from '@nextui-org/react';

const StyledContainer = styled('div', {
  display: 'flex',
});

const GoToFormButton = () => {
  const handleScrollToElement = (elementName) => {
    const element = document.getElementById(elementName);
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <StyledContainer>
      <Container
        sm
        display="flex"
        direction="column"
        alignItems="center"
        align="center"
        css={{ mt: '$15', mb: '$15' }}
      >
        <Button
          size="lg"
          shadow
          color="gradient"
          rounded
          auto
          onClick={() => handleScrollToElement('contact')}
        >
          Chci nabídku zdarma
        </Button>
      </Container>
    </StyledContainer>
  );
};

export default GoToFormButton;
