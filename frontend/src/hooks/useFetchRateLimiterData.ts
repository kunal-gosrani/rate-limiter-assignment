import { configs } from "@/configs";
import { useState } from "react";

export type FetchRateLimiterResponseData = {
	allowed: boolean;
	remaining: number;
};

export function useFetchRateLimiterData() {
	const [data, setData] = useState<FetchRateLimiterResponseData>();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function fetchData() {
		setIsLoading(true);

		try {
			const response = await fetch(`${configs.apiUrl}/api/ping`);
			const data = await response.json();
			setData(data);
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(
					"An unknown error occurred while fetching rate limiter data",
				);
			}
		} finally {
			setIsLoading(false);
		}
	}

	return { data, errorMessage, isLoading, fetch: fetchData };
}
