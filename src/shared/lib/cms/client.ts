const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

type StrapiEntity<T> = {
  id: number;
  attributes?: T;
} & T;

type StrapiResponse<T> = {
  data: StrapiEntity<T>[];
};

export async function fetchStrapiCollection<T>(
  collection: string,
  locale: string,
): Promise<T[]> {
  if (!STRAPI_API_URL) {
    return [];
  }

  const endpoint = `${STRAPI_API_URL.replace(/\/$/, "")}/api/${collection}?locale=${locale}&pagination[pageSize]=100`;
  const response = await fetch(endpoint, {
    headers: {
      ...(STRAPI_API_TOKEN ? {Authorization: `Bearer ${STRAPI_API_TOKEN}`} : {}),
    },
    next: {
      revalidate: 180,
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed for ${collection}: ${response.status}`);
  }

  const payload = (await response.json()) as StrapiResponse<T>;

  return payload.data.map((entity) => {
    if (entity.attributes) {
      return entity.attributes;
    }

    const {id, ...rest} = entity;
    void id;
    return rest as T;
  });
}

