"use client";

import { Button } from "@/components/ui/button";
import {
	useFetchRateLimiterData,
	type FetchRateLimiterResponseData,
} from "@/hooks/useFetchRateLimiterData";
import { AlertCircle } from "lucide-react";

export default function Home() {
	const { data, errorMessage, isLoading, fetch } = useFetchRateLimiterData();

	return (
		<div className="container mx-auto max-w-3xl px-4 py-2">
			<h1 className="text-2xl font-bold">Rate Limiter</h1>
			<Button onClick={fetch}>Click me</Button>

			<RateLimiterDataView
				data={data}
				isLoading={isLoading}
				errorMessage={errorMessage}
			/>
		</div>
	);
}

const RateLimiterDataView = ({
	data,
	isLoading,
	errorMessage,
}: {
	data?: FetchRateLimiterResponseData;
	isLoading: boolean;
	errorMessage: string | null;
}) => {
	if (isLoading) {
		return <p className="text-gray-500">Loading...</p>;
	}

	if (errorMessage) {
		return <p className="text-red-500">{errorMessage}</p>;
	}

	if (!data) {
		return null;
	}

	if (!data.allowed) {
		return (
			<p className="text-red-500">
				<AlertCircle className="w-4 h-4" />
				You have exceeded your remaining quota. Please try again later.
			</p>
		);
	}

	return <p className="text-green-500">Remaining Quota: {data.remaining}</p>;
};
