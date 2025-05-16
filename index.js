import { sleep } from "k6"
import http from "k6/http"
const SCENARIO = __ENV.VALIDACAO === "true" ? "vus1" : "vus10"
// k6 run -e VALIDACAO=true index.js

const scenarios = {
	vus1: {
		executor: "per-vu-iterations",
		vus: 1,
		iterations: 1,
		maxDuration: "30m"
	},
	vus10: {
		executor: "per-vu-iterations",
		vus: 1,
		iterations: 1,
		maxDuration: "30m"
	}
}

export const options = {
	scenarios: {
		[SCENARIO]: scenarios[SCENARIO]
	}
}

export default function () {
	http.get("https://quickpizza.grafana.com")

	sleep(1)
}
