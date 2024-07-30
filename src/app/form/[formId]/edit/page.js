import PrivatePage from "@/app/form/[formId]/edit/Private";

export const metadata = {
    title: "Edit form",
};

export default function Page({ params }) {
    const formId = params.formId;
    return <PrivatePage formId={formId} />;
}