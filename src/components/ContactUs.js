import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import emailjs from 'emailjs-com';
import {
  Button,
  Container,
  Card,
  Checkbox,
  Grid,
  Input,
  Link,
  Text,
  Textarea,
  styled,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const StyledIcon = styled(FontAwesomeIcon, { fs: '2rem', mr: '$3' });

const ContactUs = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    // emailjs.send(
    //   'service_x8qh9sw',
    //   'template_dx6j3tm',
    //   data,
    //   'user_OBsv0ODBZx1Rh8zsCBsIm'
    // );
    setIsSubmitted(true);
  };
  return (
    <Container sm css={{ mt: '$15', mb: '$15' }}>
      <Card
        bordered
        shadow={false}
        css={{ borderColor: '$green600', pb: '$4' }}
      >
        <Container display="flex" directoin="column" align="center">
          <Text h1 css={{ mb: '$8' }}>
            Ozvete se nam
          </Text>
          <Grid.Container css={{ mb: '$10' }}>
            <Grid sm={6} justify="center">
              <Link
                href="tel:+420739969933"
                css={{
                  color: '$green600',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledIcon icon={faPhone} />
                <Text h3>+420 739 969 933</Text>
              </Link>
            </Grid>
            <Grid sm={6} justify="center">
              <Link
                href="mailto:info@arbovert.cz"
                css={{
                  color: '$green600',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledIcon icon={faEnvelope} />
                <Text h3>info@arbovert.cz</Text>
              </Link>
            </Grid>
          </Grid.Container>
          <Container display="flex" direction="column">
            <Text h3>Nebo nás kontaktujte pomocí formuláře</Text>
            {isSubmitted ? (
              <Text h3>
                Děkujeme Vám za odeslání dotazu. Budeme Vás brzy kontaktovat.
              </Text>
            ) : (
              <form
                name="contact"
                method="post"
                action="/thanks/"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid.Container gap={2}>
                  <Grid sm={4} align="start">
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          bordered
                          label="Jméno*"
                          fullWidth
                          helperText={errors.name && 'Povinné'}
                          color={errors.name && 'error'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid sm={4} align="start">
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          bordered
                          label="Email*"
                          fullWidth
                          helperText={
                            errors.email
                              ? errors.email.type === 'required'
                                ? 'Povinné'
                                : 'Špatný formát'
                              : null
                          }
                          color={errors.email && 'error'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid sm={4} align="start">
                    <Controller
                      name="telefon"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          bordered
                          label="Telefon"
                          color="default"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid sm={12} align="start">
                    <Controller
                      name="problem"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          bordered
                          label="Seznamte nas s Vasim problemem*"
                          helperText={errors.problem && 'Povinné'}
                          color={errors.problem && 'error'}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid sm={12} align="start" direction="column">
                    <Controller
                      name="gdpr"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          size="md"
                          color="success"
                          label={
                            <Text
                              css={{
                                color: errors.gdpr && '$error',
                              }}
                            >
                              Souhlasím, že dle evropské směrnice GDPR, veškeré
                              mnou vložené údaje mohou být poskytovány třetím
                              stránám jen po mém souhlasu.*
                            </Text>
                          }
                        />
                      )}
                    />
                    {errors.gdpr && (
                      <Text
                        css={{
                          ml: '$12',
                          fs: '0.625rem',
                        }}
                      >
                        Povinné
                      </Text>
                    )}
                  </Grid>
                </Grid.Container>
                <Button type="submit" rounded auto bordered color="success">
                  Odeslat
                </Button>
              </form>
            )}
          </Container>
        </Container>
      </Card>
    </Container>
  );
};

export default ContactUs;
