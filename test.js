import { sleep } from "k6"
import http from "k6/http"
const SCENARIO = __ENV.VALIDACAO === "true" ? "vus1" : "vus10"
// k6 run -e VALIDACAO=true -e BASE_URL="https://quickpizza.grafana.com" test.js

const scenarios = {
	vus1: {
		executor: "per-vu-iterations",
		vus: 1,
		iterations: 1,
		maxDuration: __ENV.MAX_DURATION
	},
	vus10: {
		executor: "per-vu-iterations",
		vus: 1,
		iterations: 1,
		maxDuration: "30m"
	}
}

const baseUrl = __ENV.BASE_URL

export const options = {
	scenarios: {
		[SCENARIO]: scenarios[SCENARIO]
	}
}

export default function () {
	const res = http.get(baseUrl)
	console.info(res.status_text)

	sleep(1)
}
