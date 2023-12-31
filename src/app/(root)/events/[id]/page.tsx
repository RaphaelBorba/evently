import CheckouButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import { getEventById, getRelatedEventsByCategory } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { Event, SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";



export default async function Page({ params: { id }, searchParams }: SearchParamProps) {


    const event = await getEventById(id) as Event

    const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category._id,
        eventId: id,
        page: searchParams.page as string
    })

    return (
        <>
            <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
                    <Image
                        src={event.imageUrl}
                        alt="hero image"
                        width={1000}
                        height={1000}
                        className="min-h-[300px] w-full object-cover object-center"
                    />
                    <div className="flex w-full flex-col gap-8 p-5 md:p-10">
                        <div className="flex flex-col gap-6">
                            <h2 className="h2-bold">{event.title}</h2>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex gap-3">
                                    <p
                                        className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700"
                                    >
                                        {event.isFree ? "FREE" : `$${event.price}`}
                                    </p>
                                    <p className="p-medium-16 max-w-[250px] truncate rounded-full bg-gray-500/10 px-4 py-2.5 text-gray-500">
                                        {event.category.name}
                                    </p>
                                </div>
                                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                                    by {" "}
                                    <span className="text-primary-500">{event.organizer.firstName} {event.organizer.lastName}</span>
                                </p>
                            </div>
                        </div>
                        {/* CHECKOU BUTTON */}

                        <CheckouButton event={event} />

                        <div className="flex flex-col gap-5">
                            <div className="flex gap-2 md:gap-3">
                                <Image
                                    src="/assets/icons/calendar.svg"
                                    alt="calendar icon"
                                    width={32}
                                    height={32}
                                />
                                <div className="p-medium-16 flex flex-col items-start">
                                    <span className="">
                                        Start: <p className="text-gray-600">{formatDateTime(event.startDateTime).dateOnly} - {formatDateTime(event.startDateTime).timeOnly}</p>
                                    </span>
                                    <span className="">
                                        End:
                                        <p className="text-gray-600">{formatDateTime(event.endDateTime).dateOnly}
                                            - {formatDateTime(event.endDateTime).timeOnly}</p>
                                    </span>
                                </div>
                            </div>
                            <div className="p-regular-20 flex items-center gap-3">
                                <Image
                                    src="/assets/icons/location.svg"
                                    alt="location icon"
                                    width={32}
                                    height={32}
                                />
                                <p className="p-medium-16">{event.location}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="p-bold-20 text-gray-600">{"What You'll Learn"}</p>
                            <p className="p-medium-16">{event.description}</p>
                            <Link
                                href={event.url}
                                target="_blank"
                                className="p-medium-16 truncate text-primary-500 underline transition hover:text-primary-500/80"
                            >
                                {event.url}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* EVENTS FROM THE SAME CATEGORY */}
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                <h2 className="h2-bold">Related Events</h2>
                <Collection
                    data={relatedEvents?.data}
                    emptyTitle="No Events Found!"
                    emptyStateSubtext="Come back later."
                    collectionType="All_Events"
                    limit={3}
                    page={searchParams.page as string}
                    totalPages={relatedEvents?.totalPages}
                    
                />
            </section>
        </>
    )
}