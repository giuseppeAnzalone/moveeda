const BASE_URL = "/api/";

const HTTP_GET = async (end_point, params = {}) => {
  let query = "";

  if (Object.keys(params).length > 0) {
    query += "?";

    Object.entries(params).forEach(([key, val]) => {
      query += `&${key}=${val}`;
    });
  }

  const res = await fetch(`${BASE_URL}${end_point}${query}`);
  const data = await res.json();

  return data;
};

const HTTP_POST = async (end_point, body, contentType = true) => {
  const data = await fetch(`${BASE_URL}${end_point}`, {
    method: "POST",
    headers: contentType && {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const res = await data.json();
  return res;
};

export { HTTP_GET, HTTP_POST };
