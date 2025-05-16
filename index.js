import http from "k6/http"
import { sleep } from "k6"

const environment = __ENV.TARGET_ENVIRONMENT

const testParameters = {
	integration: {
		url: "https://quickpizza.grafana.com",
		threshold_http_failed_rate: ["rate<0.01"]
	},
	prod: {
		url: "https://quickpizza.grafana.com",
		threshold_http_failed_rate: ["rate<0.001"]
	}
}

export const options = {
	duration: __ENV.TEST_DURATION,
	vus: 50,
	thresholds: {
		http_req_failed: testParameters[environment].threshold_http_failed_rate
	}
}

export default function () {
	const res = http.get(testParameters[environment].url)
	console.info(res.status_text)

	sleep(1)
}
