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
		<div className="px-4 py-2 bg-teal-700 min-h-screen">
			<div className="max-w-md mx-auto bg-white rounded-2xl p-6 mt-48  text-center flex flex-col gap-4">
				<h1 className="text-3xl font-bold uppercase">Rate Limiter</h1>
				<Button onClick={fetch}>Click to refresh quota</Button>

				<RateLimiterDataView
					data={data}
					isLoading={isLoading}
					errorMessage={errorMessage}
				/>
			</div>
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
	if (isLoading && !data) {
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
			<div className="flex flex-col justify-center gap-2">
				<div className="p-4 px-8 rounded-xl mx-auto text-red-600 flex flex-col gap-2 bg-red-100">
					<div className="flex items-center justify-center">
						<AlertCircle className="w-12 h-12" />
					</div>
					<p className="">
						You have exceeded your remaining quota.
						<br />
						Please try after some time.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-center gap-2">
			<div className="border p-4 rounded-xl w-56 mx-auto">
				<p className="text-lg">Your Remaining Quota</p>
				<p className="text-5xl font-bold">{data.remaining}</p>
			</div>
		</div>
	);
};
