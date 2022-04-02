import {useState} from 'react';
import {useForm} from 'react-hook-form';
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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';

const StyledIcon = styled(FontAwesomeIcon, {fs: '2rem', mr: '$3'});

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();
    const [isFormSent, setFormSent] = useState(false);

    console.log('errors');
    console.log(errors);

    const onSubmit = (data) => {
        console.log('FIRED');
        console.log(data);
        // emailjs.send(
        //   'service_x8qh9sw',
        //   'template_dx6j3tm',
        //   data,
        //   'user_OBsv0ODBZx1Rh8zsCBsIm'
        // );
        // setFormSent(true);
    };
    return (
        <Container sm css={{mt: '$15', mb: '$15'}}>
            <Card bordered shadow={false} css={{borderColor: '$green600'}} a>
                <Container display="flex" directoin="column" align="center">
                    <Text h2>Ozvete se nam</Text>
                    <Grid.Container>
                        <Grid sm={6} justify="center">
                            <Link
                                href="tel:+420739969933"
                                css={{
                                    color: '$green600',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <StyledIcon icon={faPhone}/>
                                <Text h4>+420 739 969 933</Text>
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
                                <StyledIcon icon={faEnvelope}/>
                                <Text h4>info@arbovert.cz</Text>
                            </Link>
                        </Grid>
                    </Grid.Container>
                    <Container display="flex" direction="column">
                        <Text h3>Nebo nás kontaktujte pomocí formuláře</Text>
                        <form
                            name="contact"
                            method="post"
                            action="/thanks/"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Grid.Container gap={2}>
                                <Grid sm={4} align="start">
                                    <Input
                                        bordered
                                        label="Jméno*"
                                        fullWidth
                                        helperText={errors.name && 'Povinne'}
                                        color={errors.name && "error"}
                                        {...register('name', {required: true})}
                                    />
                                </Grid>
                                <Grid sm={4} align="start">
                                    <Input
                                        bordered
                                        label="Email*"
                                        color="default"
                                        fullWidth
                                        helperText={errors.email && 'Email je povinny'}
                                        color={errors.email && "error"}
                                        {...register('email', {required: true})}
                                    />
                                </Grid>
                                <Grid sm={4} align="start">
                                    <Input
                                        bordered
                                        label="Telefon"
                                        color="default"
                                        fullWidth
                                        {...register('telefon')}
                                    />
                                </Grid>
                                <Grid sm={12} align="start">
                                    <Textarea
                                        bordered
                                        color="default"
                                        label="Seznamte nas s Vasim problemem*"
                                        helperText={errors.problem && 'Popis problemu je povinny'}
                                        color={errors.problem && "error"}
                                        fullWidth
                                        {...register('problem', {required: true})}
                                    />
                                </Grid>
                                <Grid sm={12} align="start" direction="column">
                                    <Checkbox size="xs" {...register('gdpr', {required: true})}>
                                        Souhlasím, že dle evropské směrnice GDPR, veškeré mnou
                                        vložené údaje mohou být poskytovány třetím stránám jen po
                                        mém souhlasu.*
                                    </Checkbox>
                                    {errors.gdpr && <Text>Souhlas je povinny</Text>}
                                </Grid>
                            </Grid.Container>
                            <Button type="submit" rounded auto bordered>
                                Odeslat
                            </Button>
                        </form>
                    </Container>
                </Container>
            </Card>
        </Container>
    );
};

export default ContactUs;
