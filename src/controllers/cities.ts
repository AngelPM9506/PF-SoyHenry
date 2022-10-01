import prisma from "src/utils/prisma";

type query = {
  byName?: string | string[];
};

const controllersCities = {
  getCitiesNames: async (query: query) => {
    let { byName } = query;
    try {
      if (byName) {
        let response = await prisma.city.findMany({
          select: {
            name: true,
            activity: true,
          },
        });
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default controllersCities;
