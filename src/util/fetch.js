const request = (url, config) =>
  fetch(url, config)
    .then(res => {
      if (!res.ok) {
        // Server exception return
        throw Error("");
      }

      return res.json();
    })
    .then(resJson => {
      if (!resJson.success) {
        // Errors within the project
        throw Error("");
      } else {
        return resJson;
      }
    })
    .catch(() => {
      // Public error handling
      console.log("Internal error...");
    });

// GETrequest
export const get = url => request(url, { method: "GET" });

// POSTrequest
export const post = (url, data) =>
  request(url, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    },
    method: "POST"
  });
