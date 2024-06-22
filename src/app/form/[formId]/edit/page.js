import PrivatePage from "@/app/form/[formId]/edit/Private";

export default function Page({ params }) {
    const formId = params.formId;
    return <PrivatePage formId={formId} />;
}