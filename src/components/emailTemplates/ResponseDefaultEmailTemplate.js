import { 
    Tailwind,
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Img,
    Text,
    Row,
    Button,
    Link
} from "@react-email/components";

export default function ResponseDefaultEmailTemplate({ form, response }) {
    const previewText = `A new response for "${form.title}" form on EasierForm`;

    return (
        <Html>
            <Head>
                <title>{previewText}</title>
            </Head>
            <Preview>{previewText}</Preview>
            <Body>
                <Tailwind>
                    <Container>
                        <Section>
                            <Text className="text-2xl text-indigo-400 font-semibold">EasierForm</Text>
                        </Section>
                        <Section>
                            <Img className="w-60 h-32" src="https://firebasestorage.googleapis.com/v0/b/easier-form.appspot.com/o/public%2Flogin.png?alt=media&token=76c246b1-b2e8-40a7-816b-4f3844771533" alt="EasierForm Cover Image" />
                        </Section>
                        <Section>
                            <Row>
                                <Text><strong className="text-indigo-400 text-xl font-semibold">Congratulations!</strong> You just receive a new response for your <strong>{form.title}</strong> form. Let&apos;s check it out!</Text>
                            </Row>
                            <Row>
                                {response.data.map((item) => <ResponseItem key={item.id} item={item} />)}
                            </Row>
                        </Section>
                        <Section className="my-4">
                            <Button href={process.env.APP_URL} className="bg-indigo-400 text-white py-2 px-4 rounded">View Response</Button>
                        </Section>
                        <Section>
                            <div className="text-sm text-gray-400">All best,</div>
                            <div className="text-sm text-gray-400">EasierForm Team</div>
                        </Section>
                    </Container>
                </Tailwind>
            </Body>
        </Html>
    )
}

const ResponseItem = ({ item }) => {
    const label = item.label ? item.label : item.description ? item.description : item.placeholder ? item.placeholder : "Blank";
    switch (item.type) {
        case "short-text":
        case "long-text":
        case "number":
        case "email":
        case "phone":
        case "address":
        case "zip-code":
        case "website":
        case "date":
        case "time":
        case "date-time":
        case "dropdown":
        case "password":
            return (
                <div>
                    <strong>{label}</strong>: {item.value}
                </div>
            );
        case "checkbox":
        case "toggle":
            return (
                <div>
                    <strong>{label}</strong>: {item.value ? "Yes" : "No"}
                </div>
            );
        case "radio":
            return (
                <div>
                    <strong>{label}</strong>: {item.value}
                </div>
            );
        case "multiple-choices":
            return (
                <div>
                    <strong>{label}</strong>: {item.value.join(", ")}
                </div>
            );
        case "single-choice-grid":
            return (
                <div>
                    <strong>{label}</strong>:
                    <ul>
                        {item.value.map((ans) => (
                            <li key={ans.row}>
                                <strong>{ans.row}</strong>: {ans.col}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case "multiple-choices-grid":
            return (
                <div>
                    <strong>{label}</strong>:
                    <ul>
                        {item.value.map((ans) => (
                            <li key={ans.row}>
                                <strong>{ans.row}</strong>: {ans.cols.join(", ")}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case "pdf-file-upload":
            return (
                <div>
                    <strong>{label}</strong>: <Link href={item.value.url} target="_blank">{ item.value.name }</Link>
                </div>
            );
        case "image-upload":
            return (
                <Img src={item.value.url} alt={item.value.name} />
            );

        default:
            return (
                <div>
                    <strong>{label}</strong>: {item.value}
                </div>
            );
    }
}