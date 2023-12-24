import { IEvent } from "@/lib/database/models/event.model";

type CollectionProps = {
    data: IEvent[];
    emptyTitle: string;
    emptyStateSubtext: string;
    collectionType: "Events_Organized" | "My_Tickets" | "All_Events";
    limit: number;
    page: number | string;
    totalPages?: number;
    urlParamName?: string
}



export default function Collection({
    data,
    emptyTitle,
    emptyStateSubtext,
    collectionType,
    limit,
    page,
    totalPages = 0,
    urlParamName
}: CollectionProps) {


    return (
        <></>
    )
}



