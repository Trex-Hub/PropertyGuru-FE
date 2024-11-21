export function transformWishlistData(wishlistData: any) {
  if (!wishlistData || !wishlistData.properties) {
    return { data: [], total: 0 };
  }

  const transformedData = wishlistData.properties.map((property: any) => ({
    id: property.id,
    attributes: {
      ...property,
      image: {
        data: property.image.map((img: any) => ({
          id: img.id,
          attributes: {
            url: img.url,
            alternativeText: img.alternativeText,
          },
        })),
      },
      developer: {
        data: {
          attributes: {
            ...property.developer,
            logo: property.developer.logo
              ? {
                  data: {
                    attributes: {
                      url: property.developer.logo.url,
                    },
                  },
                }
              : undefined,
          },
        },
      },
      // Ensure these fields are not duplicated at the attributes level
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      publishedAt: undefined,
    },
  }));

  return {
    data: transformedData,
    total: wishlistData.properties.length, // Total number of items
  };
}
