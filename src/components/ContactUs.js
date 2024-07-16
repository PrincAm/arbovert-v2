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
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useIsMobile } from '../hooks/use-media-query';

const StyledIcon = styled(FontAwesomeIcon, {
  fs: '2rem',
  mr: '$3',
  width: '$13',
  height: '$13',
});

const ContactUs = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  const onSubmit = (data) => {
    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE,
      data,
      process.env.NEXT_PUBLIC_EMAILJS_USER
    );
    setIsSubmitted(true);
  };
  const isPaddingRemoved = isMobile && router.pathname === '/kontakt';
  return (
    <Container
      sm
      css={{ mt: '$15', mb: '$15', p: isPaddingRemoved && 0 }}
      id="contact"
    >
      <Card
        bordered
        shadow={true}
        css={{ borderColor: '$green800', p: '$15 0' }}
      >
        <Container
          display="flex"
          directoin="column"
          align="center"
          css={{ p: isMobile && 0 }}
        >
          <Text h1 css={{ mb: '$10' }}>
            Nezávazná nabídka zdarma
          </Text>
          <Grid.Container
            css={{ mb: '$10', p: 0 }}
            gap={2}
            align="center"
            justify="center"
          >
            <Grid sm={6} justify="center">
              <Link
                href="tel:+420739969933"
                css={{
                  color: '$green800',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledIcon icon={faPhone} />
                <Text h2 css={{ fs: '$md' }}>
                  +420 739 969 933
                </Text>
              </Link>
            </Grid>
            <Grid sm={6} justify="center">
              <Link
                href="mailto:info@arbovert.cz"
                css={{
                  color: '$green800',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledIcon icon={faEnvelope} />
                <Text h3 css={{ fs: '$md' }}>
                  info@arbovert.cz
                </Text>
              </Link>
            </Grid>
          </Grid.Container>
          <Container
            display="flex"
            direction="column"
            css={{ p: isMobile && 0 }}
          >
            {isSubmitted ? (
              <>
                <Text css={{ fs: '$md' }}>
                  Děkujeme za odeslání dotazu, byl Vám zaslán potvrzující email.
                </Text>
                <Text css={{ fs: '$md' }}>
                  Ozveme se vám do příštího pracovního dne.
                </Text>
              </>
            ) : (
              <>
                <Text h3>Nebo pomocí formuláře</Text>
                <form
                  name="contact"
                  method="post"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid.Container gap={2}>
                    <Grid sm={4} align="start" css={{ width: '100%' }}>
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
                    <Grid sm={4} align="start" css={{ width: '100%' }}>
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
                    <Grid sm={4} align="start" css={{ width: '100%' }}>
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
                    <Grid sm={12} align="start" css={{ width: '100%' }}>
                      <Controller
                        name="problem"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            bordered
                            label="Seznamte nás s Vašim problémem*"
                            helperText={errors.problem && 'Povinné'}
                            color={errors.problem && 'error'}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      sm={12}
                      align="start"
                      direction="column"
                      css={{ width: '100%' }}
                    >
                      <Controller
                        name="gdpr"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={false}
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
                                Souhlasím, že dle evropské směrnice GDPR,
                                veškeré mnou vložené údaje mohou být poskytovány
                                třetím stránám jen po mém souhlasu.*
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
                  <Text
                    h5
                    css={{
                      mt: '$2',
                      mb: '$10',
                    }}
                  >
                    Ozveme se vám do <b>příštího</b> pracovního dne.
                  </Text>
                  <Button
                    type="submit"
                    rounded
                    auto
                    bordered
                    color="success"
                    css={{
                      color: '$green800',
                      borderColor: '$green800',
                    }}
                  >
                    Odeslat
                  </Button>
                </form>
              </>
            )}
          </Container>
        </Container>
      </Card>
    </Container>
  );
};

export default ContactUs;
