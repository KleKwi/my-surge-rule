(async () => {
    let params = getParams($argument);
    let url = params.url;
    let user = params.user;
    let key = params.key;
    let test = params.test;

    $httpClient.get("http://ip-api.com/json/?lang=en", function (error, response, data) {
        const jsonData = JSON.parse(data);
        const ip = jsonData.query;
        $httpClient.get(`https://${url}/${user}/?ip=${ip}&key=${key}&test=${test}`, function (error, response, data) {
            const scamData = JSON.parse(data);
            $done({
                title: "Scam Info",
                content:
                    `IP: ${scamData.ip}\n` +
                    `Mode: ${scamData.mode}\n` +
                    `Score: ${scamData.score}\n` +
                    `Risk: ${scamData.risk}\n` +
                    `Used: ${scamData.credits.used}\n` +
                    `Remaining: ${scamData.credits.remaining}`,
                icon: "externaldrive.connected.to.line.below",
                "icon-color": "#9A7FF7",
            });
        });
    });
})();

function httpAPI(path = "", method = "GET", body = null) {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
}

function getParams(param) {
    return Object.fromEntries(
        param
            .split("&")
            .map((item) => item.split("="))
            .map(([k, v]) => [k, decodeURIComponent(v)])
    );
}
