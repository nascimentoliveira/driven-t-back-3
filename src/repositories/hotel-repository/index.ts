import { prisma } from "@/config";

async function getHotels() {
  return await prisma.hotel.findMany({
    include: {
      Rooms: true,
    },
  });
}

async function getHotelById(id: number) {
  return await prisma.hotel.findUnique({
    where: {
      id,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  getHotels,
  getHotelById,
};

export default hotelRepository;
