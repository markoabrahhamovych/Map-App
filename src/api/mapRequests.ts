export const fetchMapItems = async (): Promise<Response> => {
  const response = await fetch("public/objects.json");
  return response;
};

export const fetchMapItemsWithLost = async (): Promise<Response> => {
  const response = await fetch("public/lose-objects.json");
  return response;
};
