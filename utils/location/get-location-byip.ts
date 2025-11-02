export const getLocationById = async (query: string) => {
  const url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
  const token = "5e06935c7bd6604f0687412c68a80a5fab7d186b";
  //   const query = "46.226.227.20";

  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
  };
  const res = await fetch(url + query, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
  });

  const data = await res.json();

  return data;
};
